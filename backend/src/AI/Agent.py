import json
import asyncio
import os
import requests
from datetime import datetime, timezone, timedelta
import google.generativeai as genai
from fastapi import FastAPI, HTTPException 
from uagents import Agent, Context, Model
import uvicorn 
from langchain_community.vectorstores import PathwayVectorClient
from langchain_ollama import ChatOllama
from langchain_groq import ChatGroq
from langchain.schema import AIMessage, HumanMessage

# Set up Gemini AI
GEMINI_API_KEY = "enter_your_one"  # Replace with your actual key
genai.configure(api_key=GEMINI_API_KEY)
GEMINI_MODEL = "gemini-1.5-pro"  # Correct model for latest API

# Set up Groq API key
if "GROQ_API_KEY" not in os.environ:
    os.environ["GROQ_API_KEY"] = "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"

# Set up Pathway vector store connection
VECTOR_STORE_URL = "enter_here"  # Update this URL as needed
client = PathwayVectorClient(url=VECTOR_STORE_URL)

# Define Fetch.ai message models 
class Query(Model):
    text: str
    user_id: str
    transactions: list

class Response(Model):
    text: str

# Create Fetch.ai agent
agent = Agent(name="FinanceAI_Agent", port=9001)
app = FastAPI()  # FastAPI server for Express to communicate

def get_last_modified_date(timestamp):
    """Convert Unix timestamp to IST formatted date string."""
    if timestamp is None:
        return None
    utc_time = datetime.fromtimestamp(timestamp, timezone.utc)
    ist_time = utc_time + timedelta(hours=5, minutes=30)
    return ist_time.strftime('%Y-%m-%d %H:%M:%S %Z')

def test_vector_store_connection():
    """Test connection to vector store and return status."""
    try:
        response = requests.get(f"{VECTOR_STORE_URL}/statistics", timeout=30)
        if response.status_code == 200:
            print("Vector store connection successful!")
            return True
        else:
            print(f"Vector store connection returned status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"Vector store connection failed: {e}")
        return False

async def query_with_rag(user_query, use_groq=True):
    """
    Perform a RAG query using either Groq or Ollama.
    
    Args:
        user_query (str): The user's question
        use_groq (bool): Whether to use Groq (True) or Ollama (False)
        
    Returns:
        str: The LLM's response
    """
    print(f"Performing similarity search for: '{user_query}'")
    
    # Get relevant documents from vector store
    try:
        retrieved_docs = client.similarity_search(user_query)
        
        # Extract and format context from retrieved documents
        context_texts = []
        
        print(f"Retrieved {len(retrieved_docs)} relevant documents:")
        for i, chunk in enumerate(retrieved_docs):
            source = chunk.metadata.get('source', 'Unknown')
            content = chunk.page_content
            print(f"Document {i+1}: {source}")
            print(f"Content: {content[:100]}...")
            print("---")
            
            # Add formatted context
            context_texts.append(f"Source: {source}\nContent: {content}")
        
        # Create combined context
        combined_context = "\n\n".join(context_texts)
        
        # Create prompt with context
        prompt = f"""Use the following pieces of context to answer the user's question. 
If you don't know the answer based on the provided context, just say that you don't know.
Don't try to make up an answer.

CONTEXT:
{combined_context}

USER QUESTION: {user_query}

ANSWER:"""
        
        # Choose which LLM to use
        if use_groq:
            print("Using Groq LLM...")
            llm = ChatGroq(
                model="llama3-70b-8192",
                temperature=0,
                max_tokens=1024,
                max_retries=2,
            )
        else:
            print("Using local Ollama LLM...")
            llm = ChatOllama(
                model="mistral",
                temperature=0.1,
                base_url="http://127.0.0.1:11434",
            )
        
        # Get LLM response
        messages = [HumanMessage(content=prompt)]
        response = llm.invoke(messages)
        
        return response.content
        
    except requests.exceptions.Timeout:
        return "The request to the vector store timed out."
        
    except Exception as e:
        return f"Error during search: {e}"
async def process_query(query, user_id, use_groq=True):
    """Process the query using user ID to retrieve relevant context from vector store."""
    try:
        # Always use RAG for retrieving user-specific documents
        # Construct a modified query that includes the user ID to find relevant documents
        user_specific_query = f"UserID:{user_id}"
        print(f"Performing Similarity search for user {user_id}")
        
        # Get relevant documents from vector store for this user
        try:
            # First try to find documents specific to this user
            retrieved_docs = client.similarity_search(user_specific_query)
            
            # If no user-specific documents found, try a more general search with just the query
            if not retrieved_docs:
                print(f"No user-specific documents found for {user_id}, trying general search")
                retrieved_docs = client.similarity_search(query)
            
            # Extract and format context from retrieved documents
            context_texts = []
            
            print(f"Retrieved {len(retrieved_docs)} relevant documents:")
            for i, chunk in enumerate(retrieved_docs):
                source = chunk.metadata.get('source', 'Unknown')
                content = chunk.page_content
                print(f"Document {i+1}: {source}")
                print(f"Content: {content[:100]}...")
                print("---")
                
                # Add formatted context
                context_texts.append(f"Source: {source}\nContent: {content}")
            
            # Create combined context
            combined_context = "\n\n".join(context_texts)
            
            # Create prompt with context and user ID
            prompt = f"""You are an AI assistant helping a user with ID: {user_id}. Use the following information to assist the user effectively. If something is outside your knowledge, let the user know instead of making up an answer.

CONTEXT:
{combined_context}

USER (ID: {user_id}) QUESTION: {query}

ANSWER:"""
            
            # Choose which LLM to use
            if use_groq:
                print("Using Groq LLM...")
                llm = ChatGroq(
                    model="llama3-70b-8192",
                    temperature=0,
                    max_tokens=1024,
                    max_retries=2,
                )
            else:
                print("Using local Ollama LLM...")
                llm = ChatOllama(
                    model="mistral",
                    temperature=0.1,
                    base_url="http://127.0.0.1:11434",
                )
            
            # Get LLM response
            messages = [HumanMessage(content=prompt)]
            response = llm.invoke(messages)
            
            return response.content
            
        except requests.exceptions.Timeout:
            return f"The request to the vector store timed out while searching for user {user_id}'s data."
            
        except Exception as e:
            return f"Error during search for user {user_id}: {e}"

    except Exception as e:
        return f"Error processing query for user {user_id}: {str(e)}"
    
@app.post("/api/ai-query")
async def ai_query_endpoint(data: dict):
    """API endpoint for basic financial queries without RAG."""
    try:
        query = data.get("query")
        user_id = data.get("user_id")
        transactions = data.get("transactions", [])

        if not query or not user_id:
            raise HTTPException(status_code=400, detail="Missing query or user_id")

        response = await process_query(query, user_id)
        return {"response": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/rag-query")
async def rag_query_endpoint(data: dict):
    """API endpoint for knowledge-based queries with RAG using only user_id."""
    try:
        query = data.get("query")
        user_id = data.get("user_id")
        use_groq = data.get("use_groq", True)  # Default to Groq, can be overridden

        if not query or not user_id:
            raise HTTPException(status_code=400, detail="Missing query or user_id")

        # Ensure vector store is accessible
        if not test_vector_store_connection():
            raise HTTPException(status_code=503, detail="Vector store unavailable")

        # Pass only the user_id, not transactions
        response = await process_query(query, user_id, use_groq=use_groq)
        return {"response": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/vector-store-stats")
async def vector_store_stats():
    """Get statistics about the vector store."""
    try:
        stat = client.get_vectorstore_statistics()
        stat['last_modified'] = get_last_modified_date(stat['last_modified'])
        stat['last_indexed'] = get_last_modified_date(stat['last_indexed'])
        return stat
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching statistics: {str(e)}")

@agent.on_message(model=Query)
async def handle_query(ctx: Context, sender: str, msg: Query):
    """Handle incoming Fetch.ai agent queries."""
    response_text = await process_query(msg.text, msg.user_id)
    await ctx.send(sender, Response(text=response_text))

def start_servers():
    """Starts both Fetch AI agent and FastAPI server."""
    # Test vector store connection at startup
    test_vector_store_connection()
    
    loop = asyncio.get_event_loop()

    # Start Fetch AI agent as a background task
    loop.create_task(agent.run_async())

    # Run FastAPI with Uvicorn in the same event loop
    config = uvicorn.Config(app, host="0.0.0.0", port=9002)
    server = uvicorn.Server(config)
    loop.run_until_complete(server.serve())

if __name__ == "__main__":
    start_servers()
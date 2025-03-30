from langchain_community.embeddings import SentenceTransformerEmbeddings
import pathway as pw
from pyngrok import ngrok
import time
from pathway.xpacks.llm.vector_store import VectorStoreServer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pathlib import Path
from langchain_google_genai import GoogleGenerativeAIEmbeddings


pw.set_license_key("59BCD9-BF9E27-DA7F35-907D85-8ACA45-V3")


data = pw.io.fs.read(
    "./Data",
    format="binary",
    mode="streaming",
    with_metadata=True,
)

import getpass
import os

if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = 'enter your'

# Set embedding model
embeddings = SentenceTransformerEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2", model_kwargs={"trust_remote_code":True})

# Set up text splitter
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

# Define host and port
host = "127.0.0.1"
port = 8667

# Create Vector Store Server
server = VectorStoreServer.from_langchain_components(
    data, embedder=embeddings, splitter=splitter, parser=pw.xpacks.llm.parsers.UnstructuredParser()
)

# Set up ngrok tunnel
public_url = ngrok.connect(port)
print(f" * ngrok tunnel \"{public_url}\" -> \"http://127.0.0.1:{port}\"")

# Run the server
server.run_server(
    host,
    port=port,
    with_cache=True,
    cache_backend=pw.persistence.Backend.filesystem("./Cache"),
    threaded=True,
    debug=True
)

# Keep monitoring for new files and processing
try:
    while True:
        time.sleep(10)  # Check every 10 seconds
        new_files = [f for f in Path("./Data").iterdir() if f.is_file()]
        if new_files:
            print(f"Detected new files: {[file.name for file in new_files]}")
            # Add new files to the Pathway pipeline
            data = pw.io.fs.read("./Data", format="binary", mode="static", with_metadata=True)
except KeyboardInterrupt:
    print("Server shutting down.")

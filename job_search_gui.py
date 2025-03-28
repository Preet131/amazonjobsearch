import tkinter as tk
from tkinter import ttk
import subprocess
import threading
import queue
import os
from datetime import datetime

class JobSearchGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Amazon Job Search")
        self.root.geometry("800x600")
        
        # Set theme
        self.style = ttk.Style()
        self.style.theme_use('clam')
        
        # Configure colors
        self.bg_color = "#f0f0f0"
        self.accent_color = "#2962ff"
        self.root.configure(bg=self.bg_color)
        
        # Create main frame
        self.main_frame = ttk.Frame(root, padding="20")
        self.main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Title
        title_label = ttk.Label(
            self.main_frame,
            text="Amazon Job Search Monitor",
            font=("Helvetica", 24, "bold")
        )
        title_label.pack(pady=20)
        
        # Status frame
        self.status_frame = ttk.LabelFrame(
            self.main_frame,
            text="Status",
            padding="10"
        )
        self.status_frame.pack(fill=tk.X, pady=10)
        
        self.status_label = ttk.Label(
            self.status_frame,
            text="Ready to start",
            font=("Helvetica", 12)
        )
        self.status_label.pack()
        
        # Buttons frame
        self.button_frame = ttk.Frame(self.main_frame)
        self.button_frame.pack(pady=20)
        
        # Start button
        self.start_button = ttk.Button(
            self.button_frame,
            text="Start Job Search",
            command=self.start_search,
            style="Accent.TButton"
        )
        self.start_button.pack(side=tk.LEFT, padx=10)
        
        # Stop button
        self.stop_button = ttk.Button(
            self.button_frame,
            text="Stop",
            command=self.stop_search,
            state=tk.DISABLED
        )
        self.stop_button.pack(side=tk.LEFT, padx=10)
        
        # Output frame
        self.output_frame = ttk.LabelFrame(
            self.main_frame,
            text="Search Results",
            padding="10"
        )
        self.output_frame.pack(fill=tk.BOTH, expand=True, pady=10)
        
        # Output text
        self.output_text = tk.Text(
            self.output_frame,
            height=15,
            font=("Consolas", 10),
            wrap=tk.WORD,
            bg="white"
        )
        self.output_text.pack(fill=tk.BOTH, expand=True)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(
            self.output_frame,
            orient=tk.VERTICAL,
            command=self.output_text.yview
        )
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.output_text.configure(yscrollcommand=scrollbar.set)
        
        # Configure style for accent button
        self.style.configure(
            "Accent.TButton",
            background=self.accent_color,
            foreground="white"
        )
        
        # Initialize variables
        self.process = None
        self.running = False
        self.output_queue = queue.Queue()
        
    def start_search(self):
        if not self.running:
            self.running = True
            self.start_button.configure(state=tk.DISABLED)
            self.stop_button.configure(state=tk.NORMAL)
            self.status_label.configure(text="Search running...")
            
            # Clear output
            self.output_text.delete(1.0, tk.END)
            
            # Start the job search process
            threading.Thread(target=self.run_job_search, daemon=True).start()
            
            # Start output monitor
            self.root.after(100, self.check_output)
    
    def stop_search(self):
        if self.running:
            self.running = False
            if self.process:
                self.process.terminate()
            self.start_button.configure(state=tk.NORMAL)
            self.stop_button.configure(state=tk.DISABLED)
            self.status_label.configure(text="Search stopped")
    
    def run_job_search(self):
        try:
            self.process = subprocess.Popen(
                ['node', 'run_postman.js'],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
                universal_newlines=True
            )
            
            for line in self.process.stdout:
                if self.running:
                    timestamp = datetime.now().strftime("%H:%M:%S")
                    self.output_queue.put(f"[{timestamp}] {line}")
                else:
                    break
                    
        except Exception as e:
            self.output_queue.put(f"Error: {str(e)}")
            self.stop_search()
    
    def check_output(self):
        while not self.output_queue.empty():
            line = self.output_queue.get()
            self.output_text.insert(tk.END, line)
            self.output_text.see(tk.END)
        
        if self.running:
            self.root.after(100, self.check_output)

if __name__ == "__main__":
    root = tk.Tk()
    app = JobSearchGUI(root)
    root.mainloop() 
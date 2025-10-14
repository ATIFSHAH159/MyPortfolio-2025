from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import sys

load_dotenv()


model = ChatGoogleGenerativeAI(model="gemini-2.0-flash-001")

prompt = PromptTemplate(
    template="""
You are Atif Shah's personal assistant.
Your job is to answer questions professionally using the provided resume information.

Question: {input}
Resume Information: {info}

Guidelines:
- Always respond politely and in a professional tone.
- If the question is not related to the resume, say: "I'm sorry, I can't answer that question."
- If information is missing, provide Atif Shah’s contact details and guide the user to contact him.
- Do NOT say "based on the resume"; just answer naturally as an assistant.
    """,
    input_variables=["input", "info"],
)


info = '''

SYED ATIF SHAH
H/No T-600 Bahawal Nagar Pindi Road Kohat • Kohat, 26000 •aatifshah15@gmai.com• 0332-9621669
Education
COMSATS University Islamabad	Abbottabad, Pakistan
Bachelor of Science (BS) in Computer Science	2021-2025
CGPA: 3.37/4.00
Relevant Coursework: Web Development, Mobile App Development (Flutter), Data Communication & Computer Networks, Human-Computer Interaction (HCI), Machine Learning, Software Engineering Concepts
KARWAN MODEL COLLEGE KOHAT		Kohat, Pakistan
Higher Secondary School Certificate (HSSC)	2019-2021
Pre-Engineering
Marks: 1046/1100 (95%)
IQRA PUBLIC SCHOOL AND COLLEGE KOHAT		Kohat, Pakistan
Secondary School Certificate (SSC) 	2017-2019
Science
Marks: 932/1100 (85%)
QUAID INTER COLLEGE KOHAT		Kohat, Pakistan
Diploma in Information and Technology (DIT) 	Year 2020
Marks: 1181/1400 (84%)
Projects
•	E-commerce Website – Web Technology Course (CSC336)
Designed and developed a full-featured e-commerce platform tailored for client needs. Implemented CRUD operations for three user roles: Buyer, Seller, and Admin.
Tools & Technologies: MERN Stack (MongoDB, Express.js, React, Node.js)
•	Real-Time Bus Tracking System – University Transportation Project (FYP)
Developed a real-time GPS tracking system to monitor university buses for students and staff. Enabled live location updates, route management, and admin controls for efficient transport. Tools & Technologies: Flutter, Firebase, Google Maps API, Google Cloud Console
•	Hackathon Winner – Climate Change Maker
Won the Spiritual Award at the Climate Change Maker Hackathon.
Developed a web-based solution addressing environmental challenges through an interactive frontend and chatbot integration to raise awareness and provide eco-friendly tips.
Focus Areas: Sustainability, Climate Awareness, Chatbot Integration, Web Development
Tools & Technologies: React, CSS
 Certifications & Co-curricular Activities
•	Winner, The Climate Change Maker Hackathon – Spiritual Award
•	Winner, Inter-Subject Competition – PDC, Certificate of Achievement
•	UI/UX Design Session by Google Developer Club (GDC) – Certificate of Participation
•	Participant, VISCO Spark 2024 – Certificate of Participation
•	Participated in Final Year Project (FYP) Competition – Certificate of Participation
•	Navttc Summer of Code Batch 2 (Advance AI/ML) Continue….


Skills & Interest
•	Programming & Development:
JavaScript (ES6+), React.js, Node.js, Express.js, MongoDB (MERN Stack), Flutter, Python (Basic), HTML5, CSS3, Bootstrap, C/C++, Firebase
•	AI & Networking:
Machine Learning (Beginner Level), Human-Computer Interaction (HCI), Cisco Packet Tracer, Data Communication & Computer Networks
•	Tools & Platforms:
Git, GitHub, Figma, Canva, Visual Studio Code, Firebase, Postman, Documentation
•	Soft & Hard Skills:
Leadership, Teamwork, Problem Solving, Adaptability, Fast Learning, Project Management, Communication
Work Experience (As a Freelancer)

•	ElderLyze (AI-Base Website)
Developed an emotional support mobile app for elderly users (40+) with bilingual chatbot (English/Urdu), mood detection via emojis, medicine reminders, and SOS alerts (manual + inactivity-based). Implemented backend using Node.js with Firebase (Realtime DB, Cloud Functions, Authentication, Notifications, Storage) and integrated OpenAI API and YouTube API for intelligent chatbot and exercise video suggestions. 
'''

parser = StrOutputParser()

chain = prompt | model | parser

# If a single prompt is provided as a CLI arg, answer once and exit
if len(sys.argv) > 1:
    single_query = sys.argv[1]
    response = chain.invoke({"input": single_query, "info": info})
    print(response)
    sys.exit(0)

# Otherwise, run interactive loop
while True:
    query = input("Enter your query: ")
    if query == "exit":
        break
    response = chain.invoke({"input": query, "info": info})
    print(response)


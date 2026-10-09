import {
  ExperienceItem,
  SkillCategory,
  ProjectItem,
  InternshipItem,
  EducationItem,
  CertificationItem,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Vamsi Krishna Ramavarapu',
  shortName: 'Vamsi Krishna',
  role: 'Data Management Lead',
  location: 'Hyderabad, India',
  email: 'vamshiramavarapu@gmail.com',
  phone: '+91 9347460257',
  formattedPhone: '+91 93474 60257',
  heroIntro:
    'Data management professional experienced in data quality, reporting, database maintenance, and technical support. Passionate about maintaining accurate information, improving data workflows, and supporting business operations through technology.',
  aboutSummary:
    'Data management professional with experience in data quality, reporting, database maintenance, and technical support. Skilled in MySQL, Python, Excel, and Power BI, with strengths in communication, adaptability, teamwork, and collaboration.',
  defaultPhotoPath: '/images/profile.jpg',
  fallbackPlaceholderPath: '/images/profile-placeholder.svg',
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'Micronsure',
    position: 'Operations Manager / Data Management Lead',
    duration: 'January 2025 – Present',
    location: 'Hyderabad, India',
    responsibilities: [
      'Maintain accurate records across databases, spreadsheets, and management systems.',
      'Prepare reports and maintain data-related documentation.',
      'Organize data storage and support data quality and consistency.',
      'Coordinate data requirements and support operational workflows.',
      'Handle sensitive information responsibly.',
    ],
  },
  {
    company: 'NTH Phase Software Solutions Pvt. Ltd.',
    position: 'Support Executive',
    duration: 'July 2024 – January 2025',
    responsibilities: [
      'Provide first-level hardware, software, and network support.',
      'Assist with account setup and access management.',
      'Escalate complex technical issues to the appropriate teams.',
      'Monitor security-related issues and maintain support records.',
      'Track device allocation and assist with technical operations.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming',
    skills: ['Python'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'SQL'],
  },
  {
    category: 'Data and Productivity Tools',
    skills: ['Microsoft Excel', 'Power BI', 'Microsoft Word'],
  },
  {
    category: 'Web Technologies',
    skills: ['HTML', 'CSS', 'Web Scraping'],
  },
  {
    category: 'Professional Skills',
    skills: ['Communication', 'Teamwork', 'Flexibility', 'Active Learning', 'Collaboration'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'voice-recognition',
    title: 'Voice Recognition',
    technologies: ['Python', 'SpeechRecognition', 'PyAudio', 'PocketSphinx'],
    description:
      'Developed a Python-based voice recognition project that captures microphone audio, processes speech input, and converts spoken words into text using speech recognition libraries.',
    visualType: 'audio',
  },
  {
    id: 'currency-recognition',
    title: 'Currency Recognition',
    technologies: ['OCR', 'Machine Learning'],
    description:
      'Worked on a currency recognition project using Optical Character Recognition (OCR) and machine learning techniques to identify and distinguish different currencies.',
    visualType: 'scanner',
  },
];

export const INTERNSHIPS: InternshipItem[] = [
  {
    company: "Venky's Vision IT Solutions",
    focus: 'MySQL',
    duration: 'April 2024 – June 2024',
  },
  {
    company: "Venky's Vision IT Solutions",
    focus: 'Python',
    duration: 'December 2023 – February 2024',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'Geethanjali Degree College, Khammam',
    qualification: "Bachelor's Degree",
    subjects: ['Mathematics', 'Physics', 'Computer Science'],
    university: 'Kakatiya University',
    duration: '2023 – 2024',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Python Programming Certification',
  },
  {
    title: 'SQL Certification',
  },
  {
    title: 'Post Graduate Diploma in Computer Applications (PGDCA)',
  },
];

export const LANGUAGES: string[] = ['English', 'Hindi', 'Telugu'];

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Internships', href: '#internships' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

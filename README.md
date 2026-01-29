# HRWAVE (Mini HRMS )

This is a minified version of an HRMS
It uses Django REST Framework for the backend and React for the frontend.


## Installation

1. Clone the repository
```bash
  git clone https://github.com/username/repo-name.git
  
  cd backend
  python -m venv env
  source env/bin/activate  # Linux / Mac
  env\Scripts\activate     # Windows
  cd ethara.ai
  cd server
  pip install -r req.txt
  python manage.py migrate
  # for development
  python3 manage.py runserver 
  # for production
  gunicorn core.wsgi:application --bind 127.0.0.1:8000

  # frontend Setup 
  cd ui
  npm install
  npm run dev

```



## Usage
How to run the project or use it after setup.

```markdown
Open http://localhost:5173/ in your browser to view the frontend.
API endpoints are available at http://127.0.0.1:8000/api/

# Add Sample Departments using Django Admin panel as followed
python3 manage.py createsuperuser
# provide username and password to skip email press enter , to bypass password validation press y

open http://127.0.0.1:8000/admin/
use the creadentials made above and add desired data

```


## Features
- List, add, employees
- List and Mark Attendance for employees


## Tech Stack
- Backend: Django, Django REST Framework
- Frontend: React, Axios
- Database: PostgreSQL
- Deployment: Nginx, Gunicorn, AWS EC2 ( Backend ), Netlify (Frontend)

```text
  _____.__                                                     
_/ ____\  |  __ _____  ______  _____  _  _______ ___  __ ____  
\   __\|  | |  |  \  \/  /\  \/  /\ \/ \/ /\__  \\  \/ // __ \ 
 |  |  |  |_|  |  />    <  >    <  \     /  / __ \\   /\  ___/ 
 |__|  |____/____//__/\_ \/__/\_ \  \/\_/  (____  /\_/  \___  >
                        \/      \/              \/          \/
Fuxxwave-2026
```
  




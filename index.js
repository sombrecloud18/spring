const projects = [
    {
      image: 'img/spring-boot.svg',
      title: 'Spring Boot',
      description: 'Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.',
      currentVersion: '3.5.3',
      versionsCount: 9
    },
    {
      image: 'img/spring-framework.svg',
      title: 'Spring Framework',
      description: 'Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.',
      currentVersion: '6.2.8',
      versionsCount: 8
    },
    {
      image: 'img/spring-data.svg',
      title: 'Spring Data',
      description: 'Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.',
      currentVersion: '2025.0.1',
      versionsCount: 6
    },
    {
      image: 'img/spring-cloud.svg',
      title: 'Spring Cloud',
      description: 'Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.',
      currentVersion: '2025.0.0',
      versionsCount: 9
    },
    {
      image: 'img/spring-data-flow.svg',
      title: 'Spring Cloud Data Flow',
      description: 'Provides an orchestration service for composable data microservice applications on modern runtimes.',
      currentVersion: '2.11.5',
      versionsCount: 7
    },
    {
      image: 'img/spring-security.svg',
      title: 'Spring Security',
      description: 'Protects your application with comprehensive and extensible authentication and authorization support.',
      currentVersion: '6.5.1',
      versionsCount: 10
    }
  ];

const navigationPoints = [
    {
        title: 'Why Spring',
        dropdown: [
            {
                title: 'Overview', 
                url: '#'
            },
            {
                title: 'Generative AI', 
                url: '#'
            },
            {
                title: 'Microservices', 
                url: '#'
            },
            {
                title: 'Reactive', 
                url: '#'
            },
            {
                title: 'Event Driven', 
                url: '#'
            },
            {
                title: 'Cloud', 
                url: '#'
            },
            {
                title: 'Web Applications', 
                url: '#'
            },
            {
                title: 'Serverless', 
                url: '#'
            },
            {
                title: 'Batch', 
                url: '#'
            }
        ]
    },
    {
        title: 'Learn',
        dropdown: [
            {
                title: 'Overview', 
                url: '#'
            },
            {
                title: 'Quickstart', 
                url: '#'
            },
            {
                title: 'Guides', 
                url: '#'
            },
            {
                title: 'Blog', 
                url: '#'
            },
            {
                title: 'Security Advisories', 
                url: '#'
            }
        ]
    },
    {
        title: 'Projects',
        dropdown: [
            {
                title: 'Overview', 
                url: '#'
            },
            {
                title: 'Spring Boot', 
                url: '#'
            },
            {
                title: 'Spring Framework', 
                url: '#'
            },
            {
                title: 'Spring Cloud', 
                url: '#'
            },
            {
                title: 'Spring Cloud Data Flow', 
                url: '#'
            },
            {
                title: 'Spring Data', 
                url: '#'
            },
            {
                title: 'Spring Integration', 
                url: '#'
            },
            {
                title: 'Spring Batch', 
                url: '#'
            },
            {
                title: 'Spring Security', 
                url: '#'
            },
            {
                title: 'Spring AI',
                url: '#'
            }
        ]
    },
    {
        title: 'Academy',
        dropdown: [
            {
                title: 'Courses', 
                url: '#'
            },
            {
                title: 'Get Certified', 
                url: '#'
            }
        ]
    },
    {
        title: 'Community',
        dropdown: [
            {
                title: 'Overview', 
                url: '#'
            },
            {
                title: 'Events', 
                url: '#'
            },
            {
                title: 'Authors', 
                url: '#'
            }
        ]
    },
    {
        title: 'Tanzu Spring', 
        url: '#'
    }
    
]

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const headerNav = document.querySelector('.header__nav');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
    const container = document.querySelector('.cards__container');
    const navMenu = document.querySelector('.header__menu');

    navMenu.innerHTML = '';

    navigationPoints.forEach(point => {
        const li = document.createElement('li');
            if (point.dropdown) {
                li.className = 'menu-item has-dropdown';
                li.innerHTML = `
                    ${point.title}
                    <div class="dropdown-content">
                        ${point.dropdown.map(link => 
                            `<a href="${link.url}">${link.title}</a>`
                        ).join('')}
                    </div>
                `;
            } else {
                li.className = 'menu-item';
                li.innerHTML = `<a href="${point.url || '#'}">${point.title}</a>`;
            } 
        navMenu.appendChild(li);
    });
    
    burgerMenu.addEventListener('click', () => {
        headerNav.classList.add('open');
        burgerMenu.style.display = "none";
    });


    function closeMenu() {
        headerNav.classList.remove('open');
        burgerMenu.style.display = "";
    }

    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
        closeMenu();
        }
    });

    function renderProjects(projectsArray) {
        const container = document.querySelector('.cards__container');
        container.innerHTML = '';
        
        if (projectsArray.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>No projects found</h3>
                    <p>Try adjusting your search or filter</p>
                </div>
            `;
            return;
        }
        
        projectsArray.forEach(project => {
            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `<div class="card_heading">
                    <img src="${project.image}">
                    <h3 class="card__title">${project.title}</h3>
                    </div>
                    <p class="card__description">${project.description}</p>
                    <div class="versions">
                    <span class="current_ver">${project.currentVersion}</span>
                    <span class="all_ver">+ ${project.versionsCount} versions</span>
                    </div>`;
            container.append(card);
        });
    }

    renderProjects(projects);

    let searchTimeout;
    const searchInput = document.querySelector('.search-box');

    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const term = searchInput.value.toLowerCase().trim();
            
            if (!term) {
                renderProjects(projects);
                return;
            }
            
            const filtered = projects.filter(project => 
                project.title.toLowerCase().includes(term) || 
                project.description.toLowerCase().includes(term)
            );
            
            renderProjects(filtered);
        }, 300);
    });
});
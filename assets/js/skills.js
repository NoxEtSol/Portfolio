const skillGroups = {
  "Vývoj": ["Java", "Spring Boot", "REST", "GraphQL", "Microservices"],
  "Dáta": ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  "Prevádzka": ["Docker", "Kubernetes", "CI/CD", "Linux", "Siete"],
  "Ochrana": ["OAuth2", "Keycloak", "JWT"],
  "Prepojenia": ["API", "JSON", "XML", "Systémová integrácia"],
  "Nástroje": ["Git", "Jira", "UML", "Scrum", "Kanban"]
};

const track = document.querySelector("#track");

for (const [title, skills] of Object.entries(skillGroups)) {
  const group = document.createElement("div");
  group.className = "grp";
  const heading = document.createElement("h3");
  heading.textContent = title;
  const list = document.createElement("div");
  list.className = "pl";
  for (const skill of skills) {
    const item = document.createElement("span");
    item.className = "pill";
    item.textContent = skill;
    list.appendChild(item);
  }
  group.append(heading, list);
  track.appendChild(group);
}

import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <section className="welcome">
      <div className="logo-wrap">
        <img src={logoLight} alt="Logo" className="logo light" />
        <img src={logoDark} alt="Logo dark" className="logo dark" />
      </div>

      <nav className="resources">
        <p className="info">What’s next?</p>
        <ul>
          {resources.map(({ href, text }, i) => (
            <li key={i}>
              <a href={href} target="_blank" rel="noreferrer">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

const resources = [
  {
    href: "https://reactrouter.com/docs",
    text: "React Router Docs",
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
  },
];

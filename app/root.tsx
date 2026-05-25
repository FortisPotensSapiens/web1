import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MainMenu values={[{ value: "#", name: "Список товаров" }, { value: "#", name: "О нас" }, { value: "#", name: "Корзина" },]}></MainMenu>
        <ItemsListHeader showDate={true}></ItemsListHeader>
        <main>
          <section style={{ margin: 20, padding: 20, display: "flex" }}>
            <ItemCard description="Новый IPhone" imageSrc="phone.png" count={0}></ItemCard>
            <ItemCard description="Новый IPhone" imageSrc="phone.png" count={0}></ItemCard>
          </section>
        </main>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html >
  );
}

export function ItemCard({ description, imageSrc, count }) {
  return (<div>
    <ItemCardImg src={imageSrc} />
    <p>{description}</p>
    <button>+</button>
    <p>{count}</p>
    <button >-</button>
  </div>);
}

export function MainMenu({ values }) {
  return (<section className="header">
    {values.map(x => <a href={x.value}>{x.name}</a>)}
  </section>);
}

export function ItemsListHeader({ showDate }) {
  return (<h1 className="itemListHeaderH1">Списов товаров {showDate ? <span>{new Date().getFullYear()} </span> : <span></span>}</h1>)
}

export function ItemCardImg({ src, width = 250 }) {
  return (<img src={src} width={width} />)
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import PastTranslations from "app/translate/PastTranslations";
import ResultSkeleton from "app/translate/ResultSkeleton";
import { AppProvider } from "contexts/app.context";
import Content from "view/components/Content";
import Header from "view/components/Header";
import { Sidepane, SidepaneToggle } from "view/components/Sidepane";
import type { Route } from "./+types/root";
import "./app.css";
import ClearHistoryButton from "./translate/ClearHistoryButton";

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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fun Translation App" },
    { name: "description", content: "Welcome to Fun Translation!" },
  ];
}

// get past translations from localStorage during hydration
export const clientLoader = () => {
  const translations = localStorage.getItem("translations");
  return translations ? JSON.parse(translations) : [];
};

export function HydrateFallback() {
  return (
    <div>
      <ResultSkeleton />
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen">
        <AppProvider>
          <div className="flex h-full bg-background">
            <Sidepane>
              <PastTranslations />
              <div className="p-4 border-t border-gray-700">
                <ClearHistoryButton />
              </div>
            </Sidepane>
            <Content>
              <Header>
                <div className="flex items-center">
                  <SidepaneToggle />
                  <h1 className="ms-4 text-xl font-bold text-primary">
                    Fun Translations
                  </h1>
                </div>
              </Header>
              {children}
            </Content>
          </div>
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
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

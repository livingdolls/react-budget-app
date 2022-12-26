import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./context/Auth.context";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
			<Suspense fallback={<div>Loading...</div>}>
				<BrowserRouter>
					<AuthProvider>
						<React.StrictMode>
							<App />
						</React.StrictMode>
					</AuthProvider>
				</BrowserRouter>
			</Suspense>
		</RecoilRoot>
		<ReactQueryDevtools />
	</QueryClientProvider>
);

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./context/Auth.context";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ClimbingBoxLoader } from "react-spinners";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<RecoilRoot>
			<Suspense
				fallback={
					<div className="h-screen w-screen flex justify-center flex-col items-center content-center">
						<ClimbingBoxLoader color="#36d7b7" size={50} />
					</div>
				}
			>
				<BrowserRouter>
					<AuthProvider>
						<React.StrictMode>
							<App />
						</React.StrictMode>
					</AuthProvider>
				</BrowserRouter>
			</Suspense>
		</RecoilRoot>
	</QueryClientProvider>
);

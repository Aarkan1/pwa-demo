import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

function App(): JSX.Element {
    useEffect(() => {
        const testApi = async () => {
            let res = await fetch("/api/test");
            res = await res.json();
            console.log(res);
        };

        testApi();
    }, []);

    return (
        <Router>
            <Navbar />
            <main style={{ paddingTop: "5rem" }}>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/contact">
                    <Contact />
                </Route>
            </main>
        </Router>
    );
}

export default App;

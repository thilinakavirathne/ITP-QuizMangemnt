import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import QuizForm from "./pages/QuizForm";
import 'antd/dist/reset.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import QuizParticipant from "./pages/QuizParticipant";
import UpdateQuiz from "./pages/UpdateQuiz";


function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/particpant/:isPartipant" component={Dashboard} />
            <Route exact path="/add-quiz" component={QuizForm} />
            <Route exact path="/update-quiz/:id" component={UpdateQuiz} />
            <Route exact path="/quiz-particpant/:id" component={QuizParticipant} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;

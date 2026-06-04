import './App.css';
import { formatSol, oxygenLevel } from './missionUtils';

const mission = {
  commander: 'Mahesh Sutar',
  planet: 'Mars',
  sol: 42,
  oxygenPercent: 98,
};

function App() {
  const oxygenStatus = oxygenLevel(mission.oxygenPercent);
  const statusClass = `mission-status mission-status--${oxygenStatus.toLowerCase()}`;

  return (
    <main className="mission-app">
      <h1 className="mission-app__title">3 - Write Basic Test Case</h1>
      <section className="mission-card" aria-label="mission status">
        <h2 className="mission-card__planet">Mission: {mission.planet}</h2>
        <p className="mission-card__commander">Commander: {mission.commander}</p>
        <p className="mission-card__sol">{formatSol(mission.sol)} on surface</p>
        <span className={statusClass} role="status">
          Oxygen: {mission.oxygenPercent}% ({oxygenStatus})
        </span>
      </section>
    </main>
  );
}

export default App;

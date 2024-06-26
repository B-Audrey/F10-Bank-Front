import { NavLink } from 'react-router-dom';
import './wrong-page.scss';

export default function WrongPage() {
  return (
    <>
      <div className="wrong-page">
        <h1>Erreur</h1>
        <p>
          {' '}
          La page demandée n'est pas disponible, <NavLink to="/">retournez à la page d'accueil</NavLink>
        </p>
      </div>
    </>
  );
}

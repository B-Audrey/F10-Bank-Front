import './feature-bloc.scss';

export default function FeatureBloc({ imgLink, title, description }) {
  return (
    <div className="feature-item">
      <img src={imgLink} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

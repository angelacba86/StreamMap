import "flag-icons/css/flag-icons.min.css";
import "./ProviderContent.css";
export const ProvidersContent = ({ country }) => {
  if (!country) return null;

  const providerTypes = {
    flatrate: "Suscripción",
    free: "Gratis",
    ads: "Con Publicidad",
  };

  return (
    <div className="providers-content">
      {/* Tipos de proveedores */}
      {Object.entries(providerTypes).map(([key, label]) => {
        const list = country.providers[key];
        if (!list || list.length === 0) return null; // 👈 no renderizar si está vacío
        return (
          <div key={key} className="provider-section">
            <h4>{label}</h4>
            <div className="provider-list">
              {list.map((p) => (
                <div key={p.provider_id} className="provider-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                    alt={p.provider_name}
                  />
                  <span>{p.provider_name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

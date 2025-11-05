import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  FaStar,
  FaChartSimple,
  FaHeart,
  FaBookmark,
  FaStopwatch,
} from "react-icons/fa6";
import "flag-icons/css/flag-icons.min.css";

import "./ResultDetail.css";
import { Modal } from "../components/atoms/Modal";
import { ProvidersContent } from "../components/modules/ProviderContent";
import { getCountryName } from "../utils/countries";

const ResultDetail = () => {
  const { type, id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [showAllCountries, setShowAllCountries] = useState(false);

  const LIMIT = 22;

  const openModal = (prov) => {
    setSelectedCountry(prov);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCountry(null);
    setIsModalOpen(false);
  };

  // Traer datos del back
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/search/${type}/${id}/full`
        );
        setDetail(response.data);
      } catch (error) {
        console.error("Error al cargar detalle:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [type, id]);

  // Extraer todos los servicios únicos disponibles
  const allServices = useMemo(() => {
    if (!detail?.providers) return [];
    
    const services = new Set();
    
    detail.providers.forEach((country) => {
      if (country.providers) {
        // Recorrer flatrate, buy, rent, ads, free
        Object.values(country.providers).forEach((providerArray) => {
          if (Array.isArray(providerArray)) {
            providerArray.forEach((p) => {
              if (p.provider_name) {
                services.add(p.provider_name);
              }
            });
          }
        });
      }
    });
    
    return Array.from(services).sort();
  }, [detail?.providers]);

  // Filtrar países por servicio seleccionado
  const filteredProviders = useMemo(() => {
    if (!detail?.providers) return [];
    if (!selectedProvider) return detail.providers;

    return detail.providers.filter((country) => {
      if (!country.providers) return false;

      // Buscar en todos los tipos de providers
      const hasService = Object.values(country.providers).some((providerArray) => {
        if (!Array.isArray(providerArray)) return false;
        return providerArray.some((p) => p.provider_name === selectedProvider);
      });

      return hasService;
    });
  }, [detail?.providers, selectedProvider]);

  // Manejar cambio de filtro
  const handleFilterChange = (e) => {
    const provider = e.target.value;
    setSelectedProvider(provider);
    setShowAllCountries(false); // Resetear al filtrar
    console.log(`Filtrando por: ${provider || "Todos"}`);
    console.log(`Países encontrados: ${provider ? filteredProviders.length : detail?.providers?.length || 0}`);
  };

  // Países que se van a mostrar (con filtro aplicado)
  const displayedCountries = showAllCountries
    ? filteredProviders
    : filteredProviders.slice(0, LIMIT);

  if (loading) return <p>Cargando...</p>;
  if (!detail) return <p>No se encontró información</p>;

  console.log("total servicios disponibles:", allServices.length);
  console.log("Servicios:", allServices);

  return (
    <>
      <div className="detail">
        <div className="poster-content">
          <img
            src={
              detail.poster
                ? `https://image.tmdb.org/t/p/w300${detail.poster}`
                : "https://placehold.co/200x450?text=Sin+Imagen"
            }
            alt={detail.title}
          />
        </div>
        <div className="detail-content">
          <div className="titles">
            <h2>{detail.title}</h2>
            <h3>({detail.year})</h3>
            {detail.status ? (
              <small
                className={
                  detail.status === "Returning Series"
                    ? "returning"
                    : detail.status === "Ended"
                    ? "ended"
                    : detail.status === "Canceled"
                    ? "canceled"
                    : ""
                }
              >
                {detail.status}
              </small>
            ) : (
              ""
            )}
          </div>

          <div className="subtitles">
            {detail.genres?.map((g, i) => (
              <small className="genre" key={i}>
                {g}
              </small>
            ))}
            {detail.runtime ? (
              <div className="small-icon">
                <FaStopwatch />
                {detail.runtime}
              </div>
            ) : (
              ""
            )}

            <div className="popularity">
              <div className="small-icon" name="rating">
                <FaStar /> {detail.rating?.toFixed(1)}
              </div>
              <div className="small-icon" name="popular">
                <FaChartSimple /> {detail.popularity?.toFixed(1)}
              </div>
            </div>
          </div>

          <div className="save-buttons">
            <button>
              <FaHeart />
            </button>
            <button>
              <FaBookmark />
            </button>
          </div>

          <div className="description">
            <p>{detail.description || "Sin descripción disponible."}</p>
          </div>

          {/* Países con providers */}
          {detail.providers && detail.providers.length > 0 ? (
            <div className="countries">
              <div className="countries-head">
                <h2>Países Disponibles</h2>
                <select 
                  className="streaming" 
                  value={selectedProvider}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos los servicios ({detail.providers.length})</option>
                  {allServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              <div className="countries-body">
                {displayedCountries.length > 0 ? (
                  displayedCountries.map((prov) => (
                    <button
                      key={prov.country}
                      className="flag-btn"
                      onClick={() => openModal(prov)}
                    >
                      <small>
                        <span className={`fi fi-${prov.country.toLowerCase()}`} />{" "}
                        {prov.country}
                      </small>
                    </button>
                  ))
                ) : (
                  <p style={{ padding: "20px", color: "#999" }}>
                    No hay países con {selectedProvider} disponible
                  </p>
                )}
              </div>
              {/* Botón Ver más / Ver menos */}
              {filteredProviders.length > LIMIT && (
                <button
                  className="show-more-btn"
                  onClick={() => setShowAllCountries((prev) => !prev)}
                >
                  {showAllCountries ? "Ver menos" : `Ver más (${filteredProviders.length - LIMIT} más)`}
                </button>
              )}
              {selectedProvider && filteredProviders.length > 0 && (
                <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
                  Mostrando {filteredProviders.length} de {detail.providers.length} países con {selectedProvider}
                </p>
              )}
            </div>
          ) : (
            <p>No hay servicios disponibles en ningún país</p>
          )}
        </div>
      </div>

      {/* Modal va dentro del fragmento */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          selectedCountry ? (
            <span>
              Proveedores {getCountryName(selectedCountry.country)}{" "}
              <span
                className={`fi fi-${selectedCountry.country.toLowerCase()}`}
              ></span>
            </span>
          ) : (
            "Proveedores"
          )
        }
      >
        <ProvidersContent country={selectedCountry} />
      </Modal>
    </>
  );
};
export default ResultDetail;
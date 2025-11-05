import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const { type, id } = useParams(); // obtenemos movie o tv + id
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  // Modal Providers
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  // Mostrar Países
  const [showAllCountries, setShowAllCountries] = useState(false);
  const LIMIT = 20;

  // Países que se van a mostrar (limitados o todos)
  if (loading) return <p>Cargando...</p>;
  if (!detail) return <p>No se encontró información</p>;

  const displayedCountries =
    detail.providers && detail.providers.length > 0
      ? showAllCountries
        ? detail.providers
        : detail.providers.slice(0, LIMIT)
      : [];
  console.log(detail);

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
              </div>
              <div className="countries-body">
                {displayedCountries.map((prov) => (
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
                ))}
              </div>

              {/* Botón Ver más / Ver menos */}
              {detail.providers.length > LIMIT && (
                <button
                  className="show-more-btn"
                  onClick={() => setShowAllCountries((prev) => !prev)}
                >
                  {showAllCountries ? "Ver menos" : "Ver más"}
                </button>
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

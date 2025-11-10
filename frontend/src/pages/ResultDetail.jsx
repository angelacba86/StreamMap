import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { DetailMovie, Modal, ProvidersContent } from "../components/index";
import { getCountryName } from  "../utils/countries"

const ResultDetail = () => {
  const { type, id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [showAllCountries, setShowAllCountries] = useState(false);

  const LIMIT = 20;

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

      const hasService = Object.values(country.providers).some(
        (providerArray) => {
          if (!Array.isArray(providerArray)) return false;
          return providerArray.some(
            (p) => p.provider_name === selectedProvider
          );
        }
      );

      return hasService;
    });
  }, [detail?.providers, selectedProvider]);

  // Manejar cambio de filtro
  const handleFilterChange = (e) => {
    const provider = e.target.value;
    setSelectedProvider(provider);
    setShowAllCountries(false);
  };

  // Países que se van a mostrar (con filtro aplicado)
  const displayedCountries = showAllCountries
    ? filteredProviders
    : filteredProviders.slice(0, LIMIT);

  if (loading) return <p>Cargando...</p>;
  if (!detail) return <p>No se encontró información</p>;

  return (
    <>
      <DetailMovie
        detail={detail}
        allServices={allServices}
        selectedProvider={selectedProvider}
        filteredProviders={filteredProviders}
        displayedCountries={displayedCountries}
        showAllCountries={showAllCountries}
        LIMIT={LIMIT}
        onFilterChange={handleFilterChange}
        onToggleCountries={() => setShowAllCountries((prev) => !prev)}
        onOpenModal={openModal}
      />

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

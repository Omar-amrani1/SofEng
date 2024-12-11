function filterProperties(properties, filters) {
  return properties.filter(property => {
    if (filters.location && property.location !== filters.location) {
      return false;
    }

    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    if (filters.bedrooms && property.bedrooms !== filters.bedrooms) {
      return false;
    }

    if (filters.bathrooms && property.bathrooms !== filters.bathrooms) {
      return false;
    }

    if (filters.sshFeatures) {
      const hasAllFeatures = filters.sshFeatures.every(feature =>
        property.sshFeatures.includes(feature)
      );
      if (!hasAllFeatures) {
        return false;
      }
    }

    return true;
  });
}

module.exports = { filterProperties };

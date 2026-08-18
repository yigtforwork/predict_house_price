export function validateHouse(house) {
  const errors = {};

  if (!house.id || !house.id.trim()) {
    errors.id = "ID is required.";
  }

  const numericFields = [
    "square_footage",
    "bathrooms",
    "year_built",
    "lot_size",
    "distance_to_city_center",
    "school_rating"
  ];

  for (const field of numericFields) {
    if (house[field] === "") {
      errors[field] = "This field is required.";
      continue;
    }

    if (!Number.isFinite(Number(house[field]))) {
      errors[field] = "Must be a valid number.";
    }
  }

  if (![2, 3, 4].includes(Number(house.bedrooms))) {
    errors.bedrooms = "Bedrooms must be 2, 3, or 4.";
  }

  if (
    house.square_footage !== "" &&
    Number(house.square_footage) <= 0
  ) {
    errors.square_footage =
      "Square footage must be greater than zero.";
  }

  if (
    house.bathrooms !== "" &&
    Number(house.bathrooms) <= 0
  ) {
    errors.bathrooms =
      "Bathrooms must be greater than zero.";
  }

  if (
    house.year_built !== "" &&
    (Number(house.year_built) < 1800 ||
      Number(house.year_built) > new Date().getFullYear())
  ) {
    errors.year_built = "Enter a valid year.";
  }

  if (
    house.lot_size !== "" &&
    Number(house.lot_size) <= 0
  ) {
    errors.lot_size =
      "Lot size must be greater than zero.";
  }

  if (
    house.distance_to_city_center !== "" &&
    Number(house.distance_to_city_center) < 0
  ) {
    errors.distance_to_city_center =
      "Distance cannot be negative.";
  }

  if (
    house.school_rating !== "" &&
    (Number(house.school_rating) < 0 ||
      Number(house.school_rating) > 10)
  ) {
    errors.school_rating =
      "School rating must be between 0 and 10.";
  }

  return errors;
}
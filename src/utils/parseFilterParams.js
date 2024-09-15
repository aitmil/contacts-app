const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite === 'boolean') return isFavourite;

  if (typeof isFavourite === 'string') {
    return isFavourite.toLowerCase() === 'true';
  }

  return undefined;
};

const parseContactType = (contactType) => {
  const allowedContactTypes = ['work', 'home', 'personal'];

  if (
    typeof contactType === 'string' &&
    allowedContactTypes.includes(contactType)
  ) {
    return contactType;
  }
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};

const sortByLastName = (objArr) => {
  const sortedArr = [...objArr];

  const compare = (a, b) => {
    if (a.last_name < b.last_name) {
      return -1;
    }
    if (a.last_name > b.last_name) {
      return 1;
    }
    return 0;
  };

  return sortedArr.sort(compare);
};

export default sortByLastName;

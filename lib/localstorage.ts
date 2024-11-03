import { data_types } from '@/types';

const SaveToLocalStorage = (data: data_types) => {
  try {
    const jsonData = localStorage.getItem('watchHistory');
    const dataObject = jsonData ? JSON.parse(jsonData) : {};

    if (!dataObject.AnimeHistory) {
      dataObject.AnimeHistory = [];
    }

    let found_anime = false;
    if (data.type === 'anime') {
      dataObject.AnimeHistory.forEach((element: data_types) => {
        if (element.title === data.title) {
          element.episode_number = data.episode_number;
          found_anime = true;
        }
      });
    }

    if (!found_anime) {
      dataObject.AnimeHistory.push(data);
    }

    let updatedData = JSON.stringify(dataObject);
    localStorage.setItem('watchHistory', updatedData);
  } catch (error) {
    console.log('Some error occured while saving the data. Please contact the DEVs.');
  }
};

export default SaveToLocalStorage;

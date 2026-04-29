import { createSlice } from '@reduxjs/toolkit';
import { IIconSearch } from './interfaces';
import { TRootState } from '../../store';

const initialState: IIconSearch = {
  searchClicked: false,
}

const iconSearchSlice = createSlice({
  name: 'iconsSlice',
  initialState,
  reducers: {
    setSearchActive(state: IIconSearch) {
      state.searchClicked = true;
    },
    setSearchNotActive(state: IIconSearch) {
      state.searchClicked = false;
    }
  }
})

export const selectClickedSearch = (state: TRootState) => state.iconSearch.searchClicked;
export const { setSearchActive, setSearchNotActive } = iconSearchSlice.actions;
export const iconSearchReducer = iconSearchSlice.reducer;

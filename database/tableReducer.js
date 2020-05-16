import React from 'react'
import { View, Text } from 'react-native'

const tableReducer = () => {
  const dataReducer = (state, action) => {
    switch( action.type ) {
      case 'GET_INIT':
        return {
          isLoading: true,
          hasErrored: false,
          errMsg: "",
          data: initialData
        };
      case 'GET_SUCCESS': {
        return {
          isLoading: false,
          hasErrored: false,
          errMsg: "",
          data: action.data
        }
      };
      case 'GET_FAILURE': {
        return {
          isLoading: false,
          hasErrored: true,
          errMsg: `Data retrieval failure. ${action.err}`,
          data: []
        }
      }
      case 'ADDED_ITEM': {
        // after sql table has been updated, I want this fn to pop the row on the array
        const newData = [ ...state.data, action.newItem ]
        return {
          isLoading: false,
          hasErrored: false,
          errMsg: "",
          data: newData
        }
      };
      case 'UPDATED_ITEM': {
        const newData = state.data.map(item => {
          item.cat = item.cat == action.oldCat && action.newCat;
          return item;
        })
        return {
          
          isLoading: false,
          hasErrored: false,
          errMsg: "",
          data: newData
        }
      }

    }
    return state;
  }

  const [ state, dispatch ] = useReducer(dataReducer, {
    isLoading: true,
    hasErrored: false,
    errMsg: "",
    data: initialData
  })

  
}

export default tableReducer

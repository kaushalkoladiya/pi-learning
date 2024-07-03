'use client'

import { Provider } from 'react-redux'
import { reduxStore } from '@/redux/store'

export default function StoreProvider({ children }) {
  return <Provider store={reduxStore}>{children}</Provider>
}
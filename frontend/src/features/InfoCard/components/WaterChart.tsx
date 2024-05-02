import React from 'react'
import { WaterEntry } from '../../../types'

type Props = {
  waterPoints: WaterEntry[], 
  handleChangeWater: () => void
}
const WaterChart:React.FC<Props> = ({waterPoints, handleChangeWater}) => {
  return (
    <div>WaterChart</div>
  )
}

export default WaterChart
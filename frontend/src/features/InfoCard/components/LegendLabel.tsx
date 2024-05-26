import { useSelector } from "react-redux"
import PieLegendStyles from "../styles/PieLegendStyles.module.css"
import { selectIsInfoNewOrEditing } from "../InfoCardSlice"
import InfoBox from "../../../components/InfoBox"
import InfoCardStyles from '../styles/InfoCardStyles.module.css'
import {useRef, useState } from "react"

type Props = {
  label: string,
  value: number,
  dataIndex: number,
  backgroundColor: string, 
  borderColor:string,
  handleRemoveLabel: (dataIndex:number, labelName: string) => void
  handleLabelValueChange: (index: number, newValue: number) => void,
  handleLabelChange: (index: number, newLabel: string) => void,
  combinedPercent: number
}

const LegendLabel:React.FC<Props> = ({handleLabelValueChange, handleLabelChange, label, value, backgroundColor, borderColor, dataIndex, combinedPercent}) => {
  const isNewOrEditing = useSelector(selectIsInfoNewOrEditing)
  const [isInValidAmount, setIsInvalidAmount] = useState<boolean>(false)

  const fieldRef = useRef<HTMLInputElement>(null)


  const handleValueChange = (eventValue: string) => {
    const newValue = Number(eventValue)
    console.log(((combinedPercent - value) + newValue) <= 100)
    if (((combinedPercent - value) + newValue) <= 100) {
      setIsInvalidAmount(false)
      handleLabelValueChange(dataIndex, newValue)
    } else {
      setIsInvalidAmount(true)
      if (fieldRef.current) {
        fieldRef.current.focus()
      }
    }
  }

  return (
    <li className={PieLegendStyles.label}>
      <div className={PieLegendStyles.colorBox} style={{backgroundColor: backgroundColor, border: `1px solid ${borderColor}`}}></div>  
      {isNewOrEditing ? (
        <input 
          type='text'
          value={label}
          onChange={(e) => handleLabelChange(dataIndex, e.target.value)}
          className={PieLegendStyles.labelInput}
        />
      ) : (
        <div className={PieLegendStyles.labelName}>
          {label}
        </div>
        )
      }
      {isNewOrEditing && (
        <>
          -
          <input 
            ref={fieldRef}
            type='number'
            max={100}
            min={0}
            value={value}
            onChange={(e) => handleValueChange(e.target.value)}
            className={PieLegendStyles.percentInput}
          />
          &nbsp;%
          {(isInValidAmount && document.activeElement === fieldRef.current) &&
            <InfoBox message='max percentage reached' styles={InfoCardStyles.instructions} />
          }
        </>
      )}
    
    </li>
  )
}

export default LegendLabel
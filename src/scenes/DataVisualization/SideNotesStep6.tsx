import type { Dispatch, SetStateAction } from 'react';
import ZoomButton from 'src/components/ZoomButton';

interface ZoomProps {
  state: boolean;
  zoomed: boolean;
  setZoomed: Dispatch<SetStateAction<boolean>>
}

export default function SideNotesStep6({state, zoomed, setZoomed}: ZoomProps) {
  return (
    <div className="side-notes-column">
      <p className="text text-side-item"> 
        Hospitalization is difficult to see at this scale.
      </p>

      <div className="text zoom-label">
        <ZoomButton 
          visible={state}
          zoomed={zoomed}
          setZoomed={setZoomed}
        />
      </div>
      
      <hr/> 
      <p className="text text-side-item">
        Because not every woman with Hyperemesis Gravidarum is hospitalized or receives a diagnosis, the true number of HG cases is likely higher.      
      </p>
    </div>
  )
}
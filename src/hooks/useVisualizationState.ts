export function useVisualizationState(currentScene: number) {
  // return dictionary with chart update configuration
  return {
    showXAxis: currentScene >= 18,

    showPregnancyStages: currentScene >= 18 && currentScene <= 24,

    showYAxis: currentScene >= 20,

    showPopulationAnnotation: currentScene === 20,

    showChartTitle: currentScene >=21,

    showArea: currentScene >= 21,

    animateAreaNV: currentScene === 21,

    showDataPointAnnotation: currentScene === 22,

    showHospitalization: currentScene >= 23 && currentScene <= 25 || (currentScene >= 30),
    
    animateHospitalization: currentScene === 23,

    showZoomButton: currentScene === 24,

    showFatiguePopulation: currentScene >= 25 && currentScene <= 27,

    showSymptomPanel: currentScene >=25,

    showIceberg: currentScene >= 26,

    showWaterline: currentScene >= 27,


    showNVTransition: currentScene >= 27 && currentScene <= 28,

    showFatigueTransition: currentScene >= 27,

    showTransition: currentScene >= 28, // useEffect, animate, transition


    showHeadaches: currentScene >= 30,

    showSleepProblems: currentScene >= 31,

    showDepressions: currentScene >= 32,

    showComparison: currentScene >= 33,


  }
  
}
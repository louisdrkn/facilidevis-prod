export function AnimatedOrbs() {
  return (
    <>
      {/* Orbe Bleue - Spot de chantier */}
      <div 
        className="orb orb-blue"
        style={{ top: '-10%', left: '-5%' }}
      />
      
      {/* Orbe Orange - Gyrophare sécurité */}
      <div 
        className="orb orb-orange"
        style={{ bottom: '10%', right: '-10%' }}
      />
      
      {/* Orbe secondaire bleue */}
      <div 
        className="orb orb-blue"
        style={{ 
          top: '60%', 
          left: '70%',
          width: '200px',
          height: '200px',
          opacity: 0.2,
          animationDelay: '-10s'
        }}
      />
    </>
  );
}
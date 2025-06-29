
import React, { useEffect, useRef } from 'react';

const KnowledgeGraph = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const nodes = [
      { id: 'MOSDAC', x: 300, y: 200, size: 20, color: '#2563eb', type: 'central' },
      { id: 'INSAT-3D', x: 150, y: 100, size: 15, color: '#059669', type: 'satellite' },
      { id: 'Oceansat-2', x: 450, y: 100, size: 15, color: '#059669', type: 'satellite' },
      { id: 'Resourcesat', x: 150, y: 300, size: 15, color: '#059669', type: 'satellite' },
      { id: 'Weather Data', x: 100, y: 50, size: 12, color: '#dc2626', type: 'product' },
      { id: 'Ocean Color', x: 500, y: 50, size: 12, color: '#dc2626', type: 'product' },
      { id: 'Land Cover', x: 100, y: 350, size: 12, color: '#dc2626', type: 'product' },
      { id: 'HDF5', x: 250, y: 50, size: 10, color: '#7c3aed', type: 'format' },
      { id: 'NetCDF', x: 350, y: 50, size: 10, color: '#7c3aed', type: 'format' },
      { id: 'GeoTIFF', x: 250, y: 350, size: 10, color: '#7c3aed', type: 'format' },
      { id: 'Data Pool', x: 450, y: 300, size: 12, color: '#ea580c', type: 'service' },
      { id: 'Catalog', x: 350, y: 300, size: 12, color: '#ea580c', type: 'service' }
    ];

    const connections = [
      ['MOSDAC', 'INSAT-3D'],
      ['MOSDAC', 'Oceansat-2'],
      ['MOSDAC', 'Resourcesat'],
      ['MOSDAC', 'Data Pool'],
      ['MOSDAC', 'Catalog'],
      ['INSAT-3D', 'Weather Data'],
      ['Oceansat-2', 'Ocean Color'],
      ['Resourcesat', 'Land Cover'],
      ['Weather Data', 'HDF5'],
      ['Ocean Color', 'NetCDF'],
      ['Land Cover', 'GeoTIFF']
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      connections.forEach(([source, target]) => {
        const sourceNode = nodes.find(n => n.id === source);
        const targetNode = nodes.find(n => n.id === target);
        if (sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw labels
        ctx.fillStyle = '#374151';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.id, node.x, node.y + node.size + 15);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  return (
    <div className="w-full h-full relative bg-gray-50">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-full"
      />
      <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-sm">
        <h3 className="font-semibold text-sm mb-2">Legend</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>Portal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
            <span>Satellites</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span>Products</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <span>Formats</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-600"></div>
            <span>Services</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;

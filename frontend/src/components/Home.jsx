import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Home = () => {
  const svgRef = useRef();
  const [data, setData] = useState(null);

  // Generate random data for nodes and links
  useEffect(() => {
    const generateRandomData = () => {
      const numNodes = 50;
      const numLinks = 100;

      const nodes = Array.from({ length: numNodes }, (_, i) => ({
        id: `Node ${i + 1}`,
        group: Math.floor(Math.random() * 5) + 1, // Random group for variety
      }));

      const links = Array.from({ length: numLinks }, () => ({
        source: `Node ${Math.floor(Math.random() * numNodes) + 1}`,
        target: `Node ${Math.floor(Math.random() * numNodes) + 1}`,
        value: Math.floor(Math.random() * 10) + 1, // Random weight for links
      }));

      return { nodes, links };
    };

    const randomData = generateRandomData();
    setData(randomData);
  }, []);

  // D3 chart creation
  useEffect(() => {
    if (!data) return;

    const width = window.innerWidth;
    const height = window.innerHeight - 80; // Adjusting for navbar height
    const color = d3.scaleSequential(d3.interpolateGreys).domain([0, 1]);

    const links = data.links.map(d => ({ ...d }));
    const nodes = data.nodes.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', ticked);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    const link = svg.append('g')
      .attr('stroke', '#aaa')
      .attr('stroke-opacity', 0.6)
      .selectAll()
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll()
      .data(nodes)
      .join('circle')
      .attr('r', 8)
      .attr('fill', (d, i) => color(i / nodes.length));

    node.append('title')
      .text(d => d.id);

    node.call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [data]);

  return (
    <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gray-900 text-white p-4">
        <div className="text-xl">HomePage</div>
        <div>
          <a href="/login" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-3">Login</a>
          <a href="/register" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Sign Up</a>
        </div>
      </nav>

      {/* D3 Chart */}
      <div className="flex justify-center items-center mt-8">
        <svg ref={svgRef}></svg>
      </div>

      {/* File Upload Button */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 3px 15px' }} className="bg-transparent text-black font-semibold px-8 py-6  rounded-lg shadow-lg backdrop-blur-md hover:bg-gray-700 hover:text-white transition duration-300">
          Upload File
        </button>
      </div>
    </div>
  );
};

export default Home;

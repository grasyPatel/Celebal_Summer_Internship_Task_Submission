import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Outlet } from "react-router-dom";
import LeftSidebar from "../layout/components/LeftSidebar";

interface ResizableHandleProps {
  onResize: (clientX: number) => void;
  className?: string;
}

const ResizableHandle: React.FC<ResizableHandleProps> = ({ onResize, className = "" }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    onResize(e.clientX);
  }, [isDragging, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`w-2 bg-black rounded-lg transition-colors cursor-col-resize hover:bg-gray-700 ${className}`}
      onMouseDown={handleMouseDown}
      style={{
        backgroundColor: isDragging ? '#121212' : '#121212',
      }}
    />
  );
};

interface ResizablePanelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({ children, style = {} }) => {
  return (
    <div style={style}>
      {children}
    </div>
  );
};

interface ResizablePanelGroupProps {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
}

const ResizablePanelGroup: React.FC<ResizablePanelGroupProps> = ({ children, direction = "horizontal", className = "" }) => {
  return (
    <div className={`flex h-full ${direction === 'vertical' ? 'flex-col' : 'flex-row'} ${className}`}>
      {children}
    </div>
  );
};

const MainLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [leftWidth, setLeftWidth] = useState(20);
  const [rightWidth, setRightWidth] = useState(20);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLeftResize = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((clientX - containerRect.left) / containerRect.width) * 100;
    const minWidth = isMobile ? 0 : 10;
    const maxWidth = 30;
    setLeftWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
  }, [isMobile]);

  const handleRightResize = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((containerRect.right - clientX) / containerRect.width) * 100;
    const minWidth = 0;
    const maxWidth = 25;
    setRightWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
  }, []);

  const mainWidth = 100 - leftWidth - rightWidth;

  return (
    <div ref={containerRef}>
      <ResizablePanelGroup direction="horizontal" className="">
        {/* Left */}
        <ResizablePanel 
          style={{ width: `${leftWidth}%` }}
        >
          <LeftSidebar/>
        </ResizablePanel>
        
        <ResizableHandle 
          className="w-2 bg-black rounded-lg transition-colors" 
          onResize={handleLeftResize}
        />
        
        {/* Main */}
        <ResizablePanel 
          style={{ width: `${mainWidth}%` }}
        >
          <Outlet/>
        </ResizablePanel>
        
        <ResizableHandle 
          className="w-2 bg-black rounded-lg transition-colors" 
          onResize={handleRightResize}
        />
        
        {/* Right */}
        <ResizablePanel 
          style={{ width: `${rightWidth}%` }}
        >
          Friends activity components
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
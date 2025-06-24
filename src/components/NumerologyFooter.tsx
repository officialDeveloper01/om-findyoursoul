
import { PlaneMatrixGrid } from './PlaneMatrixGrid';
import { PlanetChart } from './PlanetChart';
import { ChakraStrip } from './ChakraStrip';

export const NumerologyFooter = () => {
  return (
    <div className="w-full bg-gray-50 p-4 border-t border-gray-300">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-4 items-start">
          <ChakraStrip />
          <div className="flex-1">
            <PlaneMatrixGrid />
          </div>
          <div className="w-80">
            <PlanetChart />
          </div>
        </div>
        
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          <div className="w-full">
            <PlaneMatrixGrid />
          </div>
          <div className="w-full">
            <PlanetChart />
          </div>
        </div>
      </div>
    </div>
  );
};

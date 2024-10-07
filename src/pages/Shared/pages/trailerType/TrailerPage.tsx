// TrailerPage.js
import FreightTrailerComponent from './FreightTrailer';
import TrailerHead from './TrailerHead';
import TrailerStandardProcess from './TrailerStandardProcess';

const TrailerPage = () => {
  return (
    <div>
      {/* Other components or content in TrailerPage */}

      {/* Call the ProcessSafetyComponent */}
      <TrailerHead />

      {/* Other components or content in TrailerPage */}
      <TrailerStandardProcess />
      <FreightTrailerComponent/>
    </div>
  );
};

export default TrailerPage;

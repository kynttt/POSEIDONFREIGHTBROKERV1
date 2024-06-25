import React from 'react';

const FreightQuoteForm = () => {
  return (
    <div className="w-full py-8 font-lexend" style={{ backgroundColor: '#7783D2', marginTop: '20px' }}>
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center px-4 lg:px-20 lg:pr-4">
        
        <div className="text-white text-3xl lg:text-5xl font-bold flex flex-col items-center lg:items-start" style={{ color: '#252F70', textShadow: '1px 1px 2px rgba(255,255,255)', paddingLeft: '20px', paddingRight: '20px', fontFamily: 'lexend', marginBottom: '1rem' }}>
          GET A
          <br className="hidden lg:inline" />
          <span className="lg:hidden">FREIGHT QUOTE</span>
          <span className="hidden lg:inline">FREIGHT QUOTE</span>
        </div>

        <div className="w-full lg:w-auto flex-grow px-4 lg:px-0">
          <div className="flex flex-col items-center justify-center w-full lg:w-auto">
            <div className="flex flex-col items-center justify-center py-4 bg-white rounded-lg shadow-xl w-full lg:w-auto" style={{ padding: '18px', boxShadow: '0px 2px 15px rgba(0, 0, 2, 0.4)', marginTop: '1rem' }}>
              <div className="text-[#252F70] text-lg lg:text-xl mb-4 font-semibold pb-5 text-center">
                Cost calculator
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-4">
                {/* Pick Up */}
                <div className="flex flex-col items-center lg:items-start lg:mr-4 mb-4 lg:mb-0 w-full lg:w-auto">
                  <label htmlFor="pickUp" className="text-[#252F70] text-lg font-semibold mb-2">
                    Pick Up
                  </label>
                  <textarea
                    id="pickUp"
                    rows={1}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full resize-none"
                    placeholder="Enter pick up details..."
                  ></textarea>
                </div>

                {/* Delivery */}
                <div className="flex flex-col items-center lg:items-start lg:mr-4 mb-4 lg:mb-0 w-full lg:w-auto">
                  <label htmlFor="delivery" className="text-[#252F70] text-lg font-semibold mb-2">
                    Delivery
                  </label>
                  <textarea
                    id="delivery"
                    rows={1}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full resize-none"
                    placeholder="Enter delivery details..."
                  ></textarea>
                </div>

                {/* Weight */}
                <div className="flex flex-col items-center lg:items-start mb-4 lg:mb-0 w-full lg:w-auto">
                  <label htmlFor="weight" className="text-[#252F70] text-lg font-semibold mb-2">
                    Weight
                  </label>
                  <div className="flex items-center w-full">
                    <textarea
                      id="weight"
                      rows={1}
                      className="border border-gray-300 rounded-lg px-3 py-2 w-full resize-none mr-2"
                      placeholder="Enter weight details..."
                    ></textarea>
                    <select
                      className="text-black rounded-sm px-2 py-1 border border-gray-300 w-24"
                      style={{ fontSize: '12px' }}
                    >
                      <option value="kg">Kilograms (kg)</option>
                      <option value="t">Tonne (t)</option>
                      <option value="g">Grams (g)</option>
                      <option value="mg">Milligrams (mg)</option>
                      <option value="oz">Ounces (oz)</option>
                      <option value="lb">Pounds (lb)</option>
                    </select>
                  </div>
                </div>

                {/* Request a Quote Button */}
                <div className="flex items-center w-full lg:w-auto" style={{ paddingTop: '20px' }}>
                  <button
                    className="text-white font-medium py-3 px-6 rounded-lg bg-blue-900 hover:bg-blue-800"
                    style={{ fontSize: '14px', backgroundColor: '#252F70', marginLeft: '20px'}}
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FreightQuoteForm;

import React from "react";
// import { useNavigate } from 'react-router-dom';

const BrokerShipperAgreement: React.FC = () => {
    // const navigate = useNavigate();
    // const [agreed, setAgreed] = useState(false);

    // const handleCheckboxChange = () => {
    //     setAgreed(!agreed);
    // };

    // const handleSubmit = () => {
    //     if (agreed) {
    //         // Handle the agreement submission logic here
    //         alert("You have agreed to the terms of the contract.");
    //         window.close(); // Close the current tab
    //     } else {
    //         alert("Please agree to the terms before proceeding.");
    //     }
    // };

    const handleGoBack = () => {
        window.close(); // This will close the current window
    };

    return (
        <div className="max-w-4xl mx-auto p-8 md:px-24 bg-white shadow-md">
            <img
            src="/pos-logo.png"
            alt="Poseidon Logo"
            className="mx-auto w-36 h-32"
          />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-center mt-8">
                Poseidon Distribution Inc. Broker/Shipper Agreement
            </h1>

            <p className="text-lg font-normal mb-6">
                
                1020 A St SE Suite 7 Auburn WA 98002
                <br />
                (253) 269-1300
                <br />
                <a href="https://www.pdienterprise.com" className="text-blue-500 underline text-lg font-normal">
                    www.pdienterprise.com
                </a>
            </p>
            </div>

            <p className="text-base font-normal mb-4 text-justify">
                FREIGHT BROKER PARTNER AGREEMENT BETWEEN LICENSED TRANSPORTATION BROKER POSEIDON DISTRIBUTION INC. AND SHIPPER.
            </p>

            <p className="text-base font-normal mb-4 text-justify">
                This Agreement constitutes a legally binding agreement effective on this day of <strong>{new Date().toLocaleDateString()}</strong> between Poseidon Distribution Inc. (referred to hereafter as, "Broker") and you, the user availing this service (referred to hereafter as, "Shipper"); collectively referred to as, the "Parties".
            </p>


            <h2 className="text-lg font-bold mt-8 mb-4 ">RECITALS</h2>
            <p className="text-base font-normal mb-4 text-justify">
                Poseidon Distribution Inc. is a licensed freight broker, duly authorized by the Federal
                Motor Carrier Safety Administration (FMCSA) in Docket Number MC-1104674 or by
                appropriate State agencies to arrange for and transportation of frei                appropriate State agencies to arrange for and transportation of freight by motor vehiclesco                service on behalf of a motor carrier, consignor or consignee.gn            </p>ma            <p className="text-base font-normal mb-4 text-justify">n transportation needs, desires to utilize the services of Poseidon
                Distribution Inc. to arrange for transportation of Shipper’s freight.
            </p>

            <h2 className="text-lg font-bold mt-8 mb-4">AGREEMENT</h2>
            <p className="text-base font-normal mb-4 text-justify">
                1. The terms of this Agreement are intended to apply to all transactions between
                the Parties for the duration of one (1) year, commencing on the date shown above, and
                shall automatically renew for successive one year periods; provided that either Party may
                terminate this Agreement on 30 days written notice to the other Party, with or without
                cause, or as otherwise provided in this Agreement.
            </p>
            <p className="text-base font-normal mb-4 text-justify">
                2. Acceptance of Goods for Transit. The Broker undertakes to arrange for any or all of
                the following services (The Services): packing, crating, handling, loading, unloading,
                storage or transport of goods for the Shipper. The Services shall be performed under the
                following terms and conditions, which the Broker has made available to the Shipper.
            </p>
            <p className="text-base font-normal mb-4 text-justify">
                3. The persons signing this Agreement are authorized to do so and intend to bind their
                respective Parties.
            </p>
            <p className="text-base font-normal mb-4 text-justify">
                NOW, THEREFORE, in consideration of the terms, covenants and conditions herein set
                forth,
                it is agreed:
            </p>

            <h3 className="text-base font-normal mt-8 mb-4">
            4. Poseidon Distribution Inc./Broker is responsible for the following:
            </h3>
            <ul className="text-base font-normal list-disc pl-8 mb-4 space-y-2 text-justify">
                <li>
                    The Broker shall procure the Services from third parties in the name, and on
                    behalf of, the Shipper.
                </li>
                <li>
                    There shall be a direct relationship between the Shipper and those third parties.
                    The Broker shall be permitted to act in any reasonably necessary manner and shall
                    perform its duties using a reasonable degree of care and diligence.
                </li>
                <li>
                    The Broker shall perform its services within a reasonable time, taking all
                    reasonable steps to perform the transaction in accordance with the Shipper's
                    instructions.
                </li>
                <li>
                    The Broker shall be permitted to depart from any instruction from the Shipper if
                    the Broker deems it necessary to do so in order to protect the Shipper's interests.
                </li>
                <li>
                    The Broker shall seek further instructions from the Shipper if it becomes
                    impossible at any time for the Broker to fulfill its duties.
                </li>
                <li>
                    The Broker shall not be liable for loss of or damage to the goods while the goods
                    are in the custody, possession or control of third parties.
                </li>
            </ul>

            <h3 className="text-base font-normal mt-8 mb-4">
                5. Shipper is responsible for the following:
            </h3>
            <ul className="text-base font-normal list-disc pl-8 mb-4 space-y-2 text-justify">
                <li>
                    The Shipper warrants that it is either the owner or the authorized agent of the
                    owner of the goods.
                </li>
                <li>
                    The Shipper authorizes the Broker to contract in the name of the Shipper with
                    third parties to perform any or all of the Services on behalf of the Shipper.
                </li>
                <li>
                    The Shipper shall provide a full and accurate description of the goods to be
                    transported.
                </li>
                <li>
                    Except where the Broker is instructed to do so, the Shipper shall properly pack,
                    stow and prepare the goods in a manner suitable and appropriate for shipment by
                    any mode of transport.
                </li>
                <li>
                    The Shipper shall mark the goods and the outside packaging as required by any
                    laws or regulations, which may be applicable while the Services are being
                    provided.
                </li>
                <li>
                    The Shipper shall pay all freight charges, duties, or other sums connected with
                    the handling and transportation of the goods.
                </li>
                <li>
                    The Shipper shall pay to the Broker all sums immediately when due, without
                    reduction or deferment on account of any claim.
                </li>
                <li>
                    The Shipper shall remain responsible for the payment of all charges when the
                    Services are to be provided upon instructions to collect freight, duties, charges or
                    any other expenses from another.
                </li>
                <li>
                    The confiscation or detention of the goods by any governmental authority shall
                    not affect or diminish the liability of the Shipper to pay all charges or other sums
                    due promptly on demand.
                </li>
                <li>
                    Shipper shall comply with all applicable laws and regulations relating to the
                    transportation of hazardous materials as defined in 49 CFR §172.800, §173, and §
                    397 et seq. to the extent that any shipments constitute hazardous materials.
                    Shipper is obligated to inform Broker immediately if any such shipments
                    constitute hazardous materials. Shipper shall defend, indemnify and hold Broker
                    harmless from any penalties or liability of any kind, including reasonable attorney
                    fees, arising out of Shipper’s failure to comply with applicable hazardous
                    materials laws and regulations.
                </li>
                <li>
                    The Shipper shall not deliver any bullion, precious metals, precious metal objects,
                    gold, silver, platinum, precious or semi-precious stones, jewelry, money,
                    securities, accounts, bills, currency, food stamps, lottery tickets, notes, bank notes,
                    coins, bonds, negotiable instruments, evidences of debt, passports, tickets,
                    documents, manuscripts, records, valuable papers, cigarettes, cellular telephones,
                    PDA’s, valuable works of art, bloodstock, live animals, plants or cuttings,
                    contraband, or vehicles except under special arrangements in which notice is
                    given to the Broker.
                </li>
                <li>
                    The Shipper shall advise Broker if any goods are liable to taint or affect other
                    goods or are likely to harbor or encourage vermin or other pests.
                </li>
                <li>
                In the event that the Shipper cancels a shipment after it has been scheduled, the Shipper may be liable for cancellation fees. The amount of the cancellation fee will be determined based on the costs incurred by the Broker in preparation for the shipment, which may include, but are not limited to, fees charged by carriers, administrative costs, and any other related expenses. The Shipper agrees to pay such cancellation fees promptly upon invoicing by the Broker.
                </li>
            </ul>

            <h3 className="text-base font-normal mt-8 mb-4">
                6. Indemnification by the Shipper. The Shipper shall indemnify and hold the Broker
                harmless for:
            </h3>
            <ul className="text-base font-normal list-disc pl-8 mb-4 space-y-2 text-justify">
                <li>
                    All duties, taxes, fines, or other expenses incurred by the Broker caused by the
                    Shipper or any party acting on his behalf.
                </li>
                <li>
                    Any claim for general average and/or salvage, and the Shipper shall provide such
                    security as may be required.
                </li>
                <li>
                    Where the Shipper himself has prepared the goods for transport, for any claim by
                    a third party for bodily injury or property damage arising out of the Shipper&#39;s
                    failure to pack, load, stow or otherwise adequately prepare the goods for
                    shipment.
                </li>
            </ul>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                7. Payments. Broker shall invoice Shipper for its services in accordance with the rates,
                charges and provisions set forth, and any written supplements or revisions that are
                mutually agreed to between the Parties in writing. If rates are negotiated between the
                Parties and not otherwise confirmed in writing, such rates shall be considered “written,”
                and shall be binding, upon Broker’s invoice to Shipper and Shipper’s payment to Broker.
                Shipper agrees to pay Broker’s invoice within 15 days of invoice date without deduction
                or setoff.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4">
                8. Lien on Cargoes.
            </h3>
            <ul className="text-base font-normal list-disc pl-8 mb-4 space-y-2 text-justify">
                <li>
                    The Broker shall have a general lien on any and all property of the Shipper in its
                    possession or control, for any claim for charges, expenses or advances incurred by
                    the Broker in connection with any of the Services rendered to the Shipper.
                </li>
                <li>
                    The Broker may, at its option, suspend property delivery until all Shippers’
                    obligations due to Broker are paid.
                </li>
                <li>
                    If such claim remains unsatisfied for thirty (30) days after demand is made, the
                    Broker may sell the goods at public auction or private sale on ten (10) days&#39;
                    written notice to the Shipper in satisfaction of the sum due to the Broker.
                </li>
                <li>
                    Any surplus from such sale, after the payment of any applicable expenses, shall
                    be transmitted to the Shipper.
                </li>
                <li>
                    The Shipper shall remain liable for any deficiency in the sale.
                </li>
            </ul>


            <h3 className="text-base font-normal mt-8 mb-4">
                9. Presentation of Claims and Liabilities.
            </h3>
            <ul className="text-base font-normal list-disc pl-8 mb-4 space-y-2 text-justify">
                <li>
                    In the event that the goods are lost, damaged, delayed or otherwise received in a
                    manner inconsistent with its intended delivery, the Shipper shall give notice to the
                    Broker, immediately after it learns of the condition, but not later than seven (7)
                    days thereafter. On receipt of such notice, the Broker shall arrange on Shipper’s
                    request an investigation of the circumstances surrounding the matter.
                </li>
                <li>
                    Shipper shall be responsible for the timely filing of a claim with Carrier, if the
                    Carrier does not pay a claim and Broker is notified of this act, it is Broker&#39;s sole
                    duty to notify Shipper in writing, and it is the Shipper&#39;s duty to timely file a
                    lawsuit or other dispute (e.g. arbitration) resolution format required for the
                    shipment.
                </li>
                <li>
                    The Broker shall not be liable for the loss, delay or damage to the goods. Carriers
                    used for the Shipment will assume liability as provided under CFR 370 for all
                    shipment loss and damage claims, including delay, will not exceed the least of
                </li>
                <ul className="list-disc pl-8 mb-4 space-y-2">
                    <li>
                        The invoice value
                    </li>
                    <li>
                        The declared value or
                    </li>
                    <li>
                        $100,000 per shipment not to exceed the maximum amount of Carrier’s
                        cargo insurance, unless at time of booking the Shipment, Shipper
                        requested a higher amount as declared value and paid the appropriate
                        excess valuation charge. Any Shipment of used materials may be subject
                        to lower limitations of liability than the limits set forth in the preceding
                        sentence, as published by Carrier. Shipper shall seek restitution from the
                        Carrier by filing a proper claim for loss and damage against the Carrier,
                        and not against the Broker. Note: Shipper should procure cargo insurance
                        to protect against loss, damage or delay that occurs in Mexico.
                    </li>
                </ul>

            </ul>


            {/* <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                10. Insurance. Broker agrees to procure and maintain at its own expense, at all times
                during the term of this Agreement, the following insurance coverage amounts:
            </h3>
            <ul className="text-base font-normal list-disc pl-8 mb-4 space-y-2 text-justify">
                <li>
                    Comprehensive general liability insurance covering bodily injury and property
                    damage
                </li>
                <li>
                    Contingent Cargo Insurance
                </li>
                <li>
                    Errors and Omissions Insurance $1,000,000 $100,000 $100,000
                    Broker shall submit to Shipper a certificate of insurance as evidence of such
                    coverage and which names Shipper as “Certificate Holder”.
                </li>

            </ul> */}

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                10. Surety Bond. Broker shall maintain a surety bond or trust fund agreement as required
                by the Federal Motor Carrier Safety Administration in the amount of $75,000 or as
                otherwise required by the FMCSA and furnish Shipper with proof upon request.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                11. Homeland Security. As applicable to each, respectively, Broker and Shipper shall
                comply with state and federal Homeland Security related laws and regulations.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                12. Assignment/Modification of Agreement. Neither party may assign or transfer this
                Agreement, in whole or in part, without the prior written consent of the other party. No
                amendment or modification of the terms of this Agreement shall be binding unless in
                writing and signed by the Parties.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                13. Severability/Survivability. In the event that the operation of any portion of this
                Agreement results in a violation of any law, or any provision is determined by a court of
                competent jurisdiction to be invalid or unenforceable, the Parties agree that such portion
                or provision shall be severable and that the remaining provisions of the Agreement shall
                continue in full force and effect. The representations and obligations of the Parties shall
                survive the termination of this Agreement for any reason.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                14. Independent Contractor. It is understood between Broker and Shipper that Broker is
                not an agent for the carrier or Shipper and shall remain at all times an independent
                contractor. Shipper does not exercise or retain any control or supervision over Broker, its
                operations, employees, or carriers.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                15. Non-waiver. Failure of either party to insist upon performance of any of the terms,
                conditions or provisions of this Agreement, or to exercise any right or privilege herein, or
                the waiver of any breach of any of the terms, conditions or provisions of this Agreement,
                shall not be construed as thereafter waiving any such terms, conditions, provisions, rights
                or privileges, but the same shall continue and remain in full force and effect as if no
                forbearance or waiver had occurred.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                16. Notices. Unless the Parties notify each other in writing of a change of address, any
                and all notices required or permitted to be given under this Agreement shall be in writing
                (or fax with machine imprint on paper acknowledging successful transmission or email
                with confirmed receipt) and shall be addressed as follows:

                <p>(Broker) Poseidon Distribution Inc.</p>
                <p>
                    Address: 1020 A St SE Suite 7 Auburn WA 98002</p>
                <p>
                    Phone: (253) 269-1300 Email: operation@pdienterprise.com</p>
            </h3>


            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                17. Indemnity. Broker and Shipper shall each defend, indemnify and hold harmless the
                other party from and against all loss, damage, expense, including injury resulting in
                death, and damage to property arising out of or in connection with the indemnifying
                party’s or its agents’ and employees’ failure to observe and/or enforce the duties and

                responsibilities set forth herein, including loading, handling, transportation, unloading or
                delivery of any Shipment hereunder or in any other way related to the indemnified party’s
                or its agents’ and employees’ negligent acts, omissions or performance of their
                obligations hereunder, unless such injury is caused by the sole negligence of the
                indemnifying party.
            </h3>


            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                18. Force Majeure. Neither Broker nor Carrier shall be liable for any delay in the
                performance of the Transportation Services resulting directly or indirectly from or
                contributed to by any force majeure, including, but not limited to, act of God, acts of
                government or other civil or military authorities, fires, accidents, floods, strikes, lockouts,
                war, riot or other circumstances beyond their reasonable control. This includes, but is not limited to, unforeseen road conditions, adverse weather conditions, traffic delays, or any other similar events that may impact the timely delivery of goods. The Shipper acknowledges and agrees that such delays may occur and that Broker shall not be held liable for any damages arising from such delays.
            </h3>


            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                19. Waiver of Certain Damages. In no event shall Broker or Carrier be liable for any
                consequential, incidental, or special damages, which may arise, from loss, damage, non-
                delivery, or delay of any shipment. This limitation shall apply to and include, but not
                limited to damages for loss of profit, loss of income, or loss of business opportunity.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                20. Cargo Insurance Recommendations: The Broker strongly encourages Shippers to procure their own cargo insurance for any shipments valued over $100,000. This recommendation is included in the terms of service and will be prominently presented to the Shipper during the booking process on the Broker's website. Additionally, Shippers are welcome to contact the Broker directly through the website for assistance in obtaining appropriate coverage. The Broker will provide guidance and resources to help Shippers secure the necessary insurance for their high-value shipments.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                21. Additional Agreements for High-Value Shipments: For shipments valued over $100,000, the Broker and Shipper may enter into a separate agreement that explicitly outlines how liability will be handled for those specific cases. This additional agreement must be signed by both Parties prior to the shipment of high-value goods.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                22. Law and Jurisdiction. The terms and conditions of the Services to be provided shall
                be governed by the Surface Transportation Act (49 USC 13101 et. seq.) where applicable
                and otherwise shall be construed in accordance with the laws of the State of Washington.
            </h3>

            <h3 className="text-base font-normal mt-8 mb-4 text-justify">
                23. Entire Agreement: This Agreement constitutes the entire agreement intended by and
                between the Parties and supersedes all prior agreements, representations, warranties,
                statements, promises, information, arrangements, and understandings, whether oral,
                written, expressed or implied, with respect to the subject matter hereof. The Parties
                further intend that this Agreement constitutes the complete and exclusive statement of its
                terms and that no extrinsic evidence may be introduced to reform this Agreement in any
                judicial or arbitration proceeding involving this Agreement. The terms of this Agreement may be subject to change based on updates provided on the Broker's website. Any modifications or updates will be effective upon posting on the website and will be deemed accepted by the Shipper upon continued use of the services.

                
            </h3>
            

            

            <p className="text-base font-medium mb-4 text-justify">
            By using or accessing any part of the services, you confirm that all information provided is accurate and verifiable. You authorize AOT Logistics and/or a credit agency to investigate your credit history, bank references, and any other information required to process this application, both now and in the future. Additionally, by using our services, you agree to the terms outlined in this Agreement and attest that you have read, understood, and accept its terms and conditions.
            </p>



            {/* <div className="mt-8 flex items-center">
                <input
                    type="checkbox"
                    id="agree"
                    checked={agreed}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-4"
                />
                <label htmlFor="agree" className="text-md">
                    I have read and agree to the terms and conditions.
                </label>
            </div>

            <button
                onClick={handleSubmit}
                className={`mt-8 px-6 py-2 text-white rounded ${agreed ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                disabled={!agreed}
            >
                Agree and Submit
            </button> */}
            {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="mt-8 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back
      </button>
        </div>
    );
};

export default BrokerShipperAgreement;

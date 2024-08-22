import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Contract {
  project_id: number;
  freelancer_id: number;
  project_title: string;
  hired_freelancer_name: string;
  project_deadline: string;
}

interface AddReviewPopupProps {
  closeReview: () => void;
  contract: Contract;
}

const AddReviewPopup: React.FC<AddReviewPopupProps> = ({ closeReview, contract }) => {
  const [ProjectId] = useState(contract.project_id);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const freelancerId = contract.freelancer_id;

  const handleSave = async () => {
    if (!rating || !review) {
      toast.error("Both fields are required");
      return;
    }

    try {
      const response = await axios.post(`https://www.api.alanced.com/freelance/Add/Review/${freelancerId}`, {
        projects: ProjectId,
        rating: rating,
        review: review
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1Nzc5NDQ1LCJpYXQiOjE3MjQyNDM0NDUsImp0aSI6ImY1YWI4ZjgzYzdlZjQ2Y2Y5YjZjYTY0N2NhODFlZTBlIiwidXNlcl9pZCI6NX0.gHOhD42TJxQoRKt34wdwBN3cBp04_Ugj5zZoGQgDOag`
        }
      });

      if (response.data.status === 200) {
        toast.success("Review Added Successfully");
        closeReview();
      } else {
        toast.error(response.data.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
        <div className="flex justify-between items-center">
          <h1 className="font-cardo text-[22px] md:text-[26px] text-[#031136] font-normal">Add Review</h1>
          <button onClick={closeReview} className="text-gray-500 hover:text-gray-700">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className='mt-4 md:mt-8'>
          <h1 className="font-cardo text-[18px] md:text-[20px] text-[#031136] font-normal text-left">
            Rating <span className="text-red-500">*</span>
          </h1>
          <select
            className="w-full border my-2 py-1.5 px-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
            name="rating"
            value={rating}
            onChange={e => setRating(e.target.value)}
            required
          >
            <option disabled value="">Choose Rating</option>
            <option value="1.0">1.0</option>
            <option value="1.5">1.5</option>
            <option value="2.0">2.0</option>
            <option value="2.5">2.5</option>
            <option value="3.0">3.0</option>
            <option value="3.5">3.5</option>
            <option value="4.0">4.0</option>
            <option value="4.5">4.5</option>
            <option value="5.0">5.0</option>
          </select>
          <h1 className="font-cardo text-[18px] md:text-[20px] text-[#031136] font-normal text-left pt-5">
            Review <span className="text-red-500">*</span>
          </h1>
          <textarea
            cols={30}
            rows={5}
            className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
            name="review"
            value={review}
            onChange={e => setReview(e.target.value)}
            required
          ></textarea>
          <div className="mt-4 md:mt-8 flex justify-end">
            <button onClick={handleSave} className="inline-block text-sm px-4 py-2 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-3 font-semibold">
              Submit
            </button>
            <button
              className="p-0.5 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF]"
              onClick={closeReview}
            >
              <button className="px-2 py-1 bg-white">
                <p className="bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent font-semibold text-sm py-[4px] px-[8px]">
                  Cancel
                </p>
              </button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewPopup;

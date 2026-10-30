import React, { useEffect } from 'react';
import Lottie from 'lottie-react';

// Professional medical success animation data (inline for simplicity)
const medicalSuccessAnimation = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 200,
  "h": 200,
  "nm": "Medical Success",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Checkmark",
      "sr": 1,
      "ks": {
        "o": {"a": 0, "k": 100},
        "r": {"a": 0, "k": 0},
        "p": {"a": 0, "k": [100, 100, 0]},
        "a": {"a": 0, "k": [0, 0, 0]},
        "s": {
          "a": 1,
          "k": [
            {"i": {"x": [0.42], "y": [1]}, "o": {"x": [0.58], "y": [0]}, "t": 0, "s": [0]},
            {"t": 30, "s": [120]}
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ind": 0,
              "ty": "sh",
              "ks": {
                "a": 0,
                "k": {
                  "i": [[0, 0], [0, 0], [0, 0]],
                  "o": [[0, 0], [0, 0], [0, 0]],
                  "v": [[-20, 0], [-5, 15], [25, -15]],
                  "c": false
                }
              }
            },
            {
              "ty": "st",
              "c": {"a": 0, "k": [0.2, 0.7, 0.3, 1]},
              "o": {"a": 0, "k": 100},
              "w": {"a": 0, "k": 8},
              "lc": 2,
              "lj": 2
            }
          ]
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0
    },
    {
      "ddd": 0,
      "ind": 2,
      "ty": 4,
      "nm": "Circle",
      "sr": 1,
      "ks": {
        "o": {"a": 0, "k": 100},
        "r": {"a": 0, "k": 0},
        "p": {"a": 0, "k": [100, 100, 0]},
        "a": {"a": 0, "k": [0, 0, 0]},
        "s": {
          "a": 1,
          "k": [
            {"i": {"x": [0.42], "y": [1]}, "o": {"x": [0.58], "y": [0]}, "t": 0, "s": [0]},
            {"t": 20, "s": [100]}
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": {"a": 0, "k": [80, 80]},
              "p": {"a": 0, "k": [0, 0]}
            },
            {
              "ty": "st",
              "c": {"a": 0, "k": [0.2, 0.7, 0.3, 1]},
              "o": {"a": 0, "k": 100},
              "w": {"a": 0, "k": 4},
              "lc": 1,
              "lj": 1
            }
          ]
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0
    }
  ]
};

const PatientSuccessModal = ({ isOpen, onClose, patientName }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center animate-slideUp">
        <div className="mb-4">
          <Lottie
            animationData={medicalSuccessAnimation}
            style={{ width: 120, height: 120 }}
            className="mx-auto"
            loop={false}
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Patient Added Successfully
        </h3>

        {patientName && (
          <p className="text-gray-600 mb-6">
            {patientName} has been registered in the system
          </p>
        )}

        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PatientSuccessModal;
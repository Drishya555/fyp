# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import cv2
# import numpy as np
# from tensorflow.keras.models import load_model
# import os
# from django.conf import settings

# # EXACT MODEL LOADING AS YOU WANT IT
# MODEL_DIR = os.path.join(settings.BASE_DIR, 'models')

# # Load Pneumonia Model
# PNEUMONIA_MODEL = None
# try:
#     pneumonia_path = os.path.join(MODEL_DIR, 'pneumonia.keras')
#     PNEUMONIA_MODEL = load_model(pneumonia_path)
#     print("✓ Pneumonia model loaded successfully")
# except Exception as e:
#     print(f"× Pneumonia model loading failed: {e}")

# # Load Brain Tumor Model  
# BRAIN_TUMOR_MODEL = None
# try:
#     brain_path = os.path.join(MODEL_DIR, 'braintumor.keras')
#     BRAIN_TUMOR_MODEL = load_model(brain_path)
#     print("✓ Brain tumor model loaded successfully")
# except Exception as e:
#     print(f"× Brain tumor model loading failed: {e}")

# def is_lung_xray(image):
#     """Basic validation for lung X-ray images"""
#     # Convert to grayscale if not already
#     if len(image.shape) == 3:
#         image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
#     # Lung X-rays typically have specific intensity distributions
#     hist = cv2.calcHist([image], [0], None, [256], [0,256])
#     peak = np.argmax(hist)
    
#     # Typical lung X-rays have peak intensities in this range
#     return 50 < peak < 200

# def is_brain_mri(image):
#     """Basic validation for brain MRI images"""
#     # Convert to grayscale if not already
#     if len(image.shape) == 3:
#         image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
#     # Brain MRIs typically have specific intensity distributions
#     mean_intensity = np.mean(image)
#     std_intensity = np.std(image)
    
#     # Typical brain MRIs fall in these intensity ranges
#     return 20 < mean_intensity < 100 and std_intensity > 20

# @csrf_exempt
# def predict_pneumonia(request):
#     """Endpoint for pneumonia prediction"""
#     if request.method != 'POST':
#         return JsonResponse({'error': 'POST required'}, status=405)
    
#     if not PNEUMONIA_MODEL:
#         return JsonResponse({'error': 'Model not loaded'}, status=500)
    
#     if 'image' not in request.FILES:
#         return JsonResponse({'error': 'No image provided'}, status=400)
    
#     try:
#         # Process directly from memory
#         img_bytes = request.FILES['image'].read()
#         img_array = np.frombuffer(img_bytes, np.uint8)
#         img = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)
        
#         # Validate it's a lung X-ray
#         if not is_lung_xray(img):
#             return JsonResponse({
#                 'error': 'Invalid image type. Please upload a lung X-ray image.',
#                 'detected': 'Cannot confirm this is a lung X-ray'
#             }, status=400)
        
#         # Preprocess for pneumonia model (1 channel)
#         img = cv2.resize(img, (150, 150)) / 255.0
#         img = np.expand_dims(img, axis=(0, -1))  # Shape: (1, 150, 150, 1)
        
#         # Predict
#         pred = PNEUMONIA_MODEL.predict(img)[0][0]
        
#         return JsonResponse({
#             'prediction': 'PNEUMONIA' if pred > 0.5 else 'NORMAL',
#             'confidence': float(pred),
#             'validation': 'Confirmed lung X-ray'
#         })
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)

# @csrf_exempt  
# def predict_brain_tumor(request):
#     """Endpoint for brain tumor prediction"""
#     if request.method != 'POST':
#         return JsonResponse({'error': 'POST required'}, status=405)
    
#     if not BRAIN_TUMOR_MODEL:
#         return JsonResponse({'error': 'Model not loaded'}, status=500)
    
#     if 'image' not in request.FILES:
#         return JsonResponse({'error': 'No image provided'}, status=400)
    
#     try:
#         # Process directly from memory
#         img_bytes = request.FILES['image'].read()
#         img_array = np.frombuffer(img_bytes, np.uint8)
#         img = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)
        
#         # Validate it's a brain MRI
#         if not is_brain_mri(img):
#             return JsonResponse({
#                 'error': 'Invalid image type. Please upload a brain MRI image.',
#                 'detected': 'Cannot confirm this is a brain MRI'
#             }, status=400)
        
#         # Preprocess for brain tumor model (1 channel)
#         img = cv2.resize(img, (150, 150)) / 255.0
#         img = np.expand_dims(img, axis=(0, -1))  # Shape: (1, 150, 150, 1)
        
#         # Predict
#         pred = BRAIN_TUMOR_MODEL.predict(img)[0][0]
        
#         return JsonResponse({
#             'prediction': 'Healthy' if pred >= 0.5 else 'Brain Tumor',
#             'confidence': float(pred),
#             'validation': 'Confirmed brain MRI'
#         })
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)

















from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os
from django.conf import settings

# MODEL LOADING
MODEL_DIR = os.path.join(settings.BASE_DIR, 'models')

# Load Pneumonia Model
PNEUMONIA_MODEL = None
try:
    pneumonia_path = os.path.join(MODEL_DIR, 'pneumonia.keras')
    PNEUMONIA_MODEL = load_model(pneumonia_path)
    print("✓ Pneumonia model loaded successfully")
except Exception as e:
    print(f"× Pneumonia model loading failed: {e}")

# Load Brain Tumor Model  
BRAIN_TUMOR_MODEL = None
try:
    brain_path = os.path.join(MODEL_DIR, 'braintumor.keras')
    BRAIN_TUMOR_MODEL = load_model(brain_path)
    print("✓ Brain tumor model loaded successfully")
except Exception as e:
    print(f"× Brain tumor model loading failed: {e}")

def is_lung_xray(image):
    """Robust validation for lung X-ray images"""
    # Convert to grayscale if not already
    if len(image.shape) == 3:
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # 1. Check intensity distribution
    hist = cv2.calcHist([image], [0], None, [256], [0,256])
    normalized_hist = hist / hist.sum()  # Normalize histogram
    
    # X-rays typically have specific histogram patterns
    # Most pixels in lungs are mid-gray with clear peaks
    mid_gray_ratio = np.sum(normalized_hist[50:200]) / np.sum(normalized_hist)
    
    # 2. Check intensity statistics
    mean_intensity = np.mean(image)
    std_intensity = np.std(image)
    
    # 3. Check edge features (lungs have distinctive edge patterns)
    edges = cv2.Canny(image, 50, 150)
    edge_percentage = np.count_nonzero(edges) / edges.size
    
    # 4. Check for lung-like structures
    # Apply threshold to highlight potential lung regions
    _, binary = cv2.threshold(image, mean_intensity, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Lung X-rays typically have a symmetrical structure with specific contour properties
    has_large_contours = False
    if contours:
        areas = [cv2.contourArea(c) for c in contours]
        largest_area = max(areas) if areas else 0
        # Check if largest contour is within expected range for lungs
        if 0.05 * image.size < largest_area < 0.7 * image.size:
            has_large_contours = True
    
    # 5. Check for bilateral symmetry (common in lung X-rays)
    h, w = image.shape
    left_half = image[:, :w//2]
    right_half = image[:, w//2:]
    right_half_flipped = cv2.flip(right_half, 1)  # Flip horizontally
    
    # Calculate symmetry score (lower means more symmetric)
    if left_half.shape == right_half_flipped.shape:
        symmetry_score = np.mean(np.abs(left_half.astype(float) - right_half_flipped.astype(float)))
        symmetry_valid = symmetry_score < 30  # Threshold for symmetry
    else:
        symmetry_valid = False
    
    # Combined criteria for lung X-ray validation
    mid_gray_valid = mid_gray_ratio > 0.6  # Most pixels should be in mid-gray range
    intensity_valid = 30 < mean_intensity < 200  # Typical range for X-rays
    contrast_valid = 20 < std_intensity < 80  # X-rays have moderate contrast
    edge_valid = 0.01 < edge_percentage < 0.15  # Some but not too many edges
    
    # Convert numpy bool_ to Python bool to avoid JSON serialization issues
    checks = [
        bool(mid_gray_valid),
        bool(intensity_valid), 
        bool(contrast_valid), 
        bool(edge_valid),
        bool(has_large_contours),
        bool(symmetry_valid)
    ]
    
    # Print validation details if needed for debugging
    # print(f"Validation scores: mid_gray={mid_gray_ratio}, mean={mean_intensity}, std={std_intensity}, edge={edge_percentage}, contours={has_large_contours}, symmetry={symmetry_score if 'symmetry_score' in locals() else 'N/A'}")
    
    # Return true if most criteria are met (at least 4 out of 6)
    validation_score = sum(checks)
    return validation_score >= 4  # At least 4 criteria must be met
    return criteria_met >= 2  # At least 2 of 3 criteria should be met

def is_brain_mri(image):
    """Improved validation for brain MRI images"""
    # Convert to grayscale if not already
    if len(image.shape) == 3:
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # 1. Check intensity characteristics
    mean_intensity = np.mean(image)
    std_intensity = np.std(image)
    
    # 2. Check shape characteristics (brain MRIs typically have oval/round shapes)
    _, thresh = cv2.threshold(image, 30, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
            # Check if we have significant contours
    has_significant_contour = False
    if contours:
        # Find the largest contour
        largest_contour = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(largest_contour)
        if area > (image.shape[0] * image.shape[1] * 0.1):  # At least 10% of image
            has_significant_contour = True
    
    # Combined criteria for brain MRI validation
    intensity_valid = 20 < mean_intensity < 150  # Broader range
    contrast_valid = std_intensity > 15
    
    # Return true if most criteria are met
    # Convert numpy bool_ to Python bool to avoid JSON serialization issues
    criteria_met = sum([bool(intensity_valid), bool(contrast_valid), bool(has_significant_contour)])
    return criteria_met >= 2  # At least 2 of 3 criteria should be met

@csrf_exempt
def predict_pneumonia(request):
    """Endpoint for pneumonia prediction"""
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)
    
    if not PNEUMONIA_MODEL:
        return JsonResponse({'error': 'Model not loaded'}, status=500)
    
    if 'image' not in request.FILES:
        return JsonResponse({'error': 'No image provided'}, status=400)
    
    try:
        # Process directly from memory
        img_bytes = request.FILES['image'].read()
        img_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)
        
        # Check if image was loaded properly
        if img is None or img.size == 0:
            return JsonResponse({'error': 'Invalid image format or corrupted file'}, status=400)
        
        # Validate it's a lung X-ray
        is_valid_xray = is_lung_xray(img)
        
        if not is_valid_xray:
            return JsonResponse({
                'error': 'The uploaded image does not appear to be a valid lung X-ray.',
                'validation_passed': False,
                'details': 'Please upload a proper chest X-ray image for pneumonia detection.'
            }, status=400)
        
        # Preprocess for pneumonia model (1 channel)
        img = cv2.resize(img, (150, 150)) / 255.0
        img = np.expand_dims(img, axis=(0, -1))  # Shape: (1, 150, 150, 1)
        
        # Predict
        pred = float(PNEUMONIA_MODEL.predict(img)[0][0])
        
        # FIXED: Correct interpretation based on threshold
        # Note: If your model was trained with 0=NORMAL and 1=PNEUMONIA,
        # then values close to 1 indicate pneumonia
        if pred > 0.5:
            diagnosis = "PNEUMONIA"
            confidence_normal = float(1 - pred)
            confidence_pneumonia = float(pred)
        else:
            diagnosis = "NORMAL"
            confidence_normal = float(pred)
            confidence_pneumonia = float(1 - pred)
        
        return JsonResponse({
            'prediction': diagnosis,
            'confidence': {
                'pneumonia': float(confidence_pneumonia),
                'normal': float(confidence_normal)
            },
            'validation': 'Confirmed lung X-ray',
            'validation_passed': True
        })
    except Exception as e:
        import traceback
        return JsonResponse({
            'error': str(e),
            'traceback': traceback.format_exc()
        }, status=500)

@csrf_exempt  
def predict_brain_tumor(request):
    """Endpoint for brain tumor prediction"""
    if request.method != 'POST':
        return JsonResponse({'error': 'POST required'}, status=405)
    
    if not BRAIN_TUMOR_MODEL:
        return JsonResponse({'error': 'Model not loaded'}, status=500)
    
    if 'image' not in request.FILES:
        return JsonResponse({'error': 'No image provided'}, status=400)
    
    try:
        # Process directly from memory
        img_bytes = request.FILES['image'].read()
        img_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)
        
        # Check if image was loaded properly
        if img is None or img.size == 0:
            return JsonResponse({'error': 'Invalid image format or corrupted file'}, status=400)
        
        # Validate it's a brain MRI
        is_valid_mri = is_brain_mri(img)
        
        if not is_valid_mri:
            return JsonResponse({
                'error': 'The uploaded image does not appear to be a valid brain MRI scan.',
                'validation_passed': False,
                'details': 'Please upload a proper brain MRI image for tumor detection.'
            }, status=400)
        
        # Preprocess for brain tumor model (1 channel)
        img = cv2.resize(img, (150, 150)) / 255.0
        img = np.expand_dims(img, axis=(0, -1))  # Shape: (1, 150, 150, 1)
        
        # Predict
        pred = float(BRAIN_TUMOR_MODEL.predict(img)[0][0])
        
        # FIXED: Make sure interpretation matches model training
        # Check if the model was trained with 0=Tumor and 1=Healthy or vice versa
        if pred >= 0.5:
            diagnosis = "Healthy"
            confidence_healthy = float(pred)
            confidence_tumor = float(1 - pred)
        else:
            diagnosis = "Brain Tumor"
            confidence_healthy = float(pred)
            confidence_tumor = float(1 - pred)
        
        return JsonResponse({
            'prediction': diagnosis,
            'confidence': {
                'healthy': float(confidence_healthy),
                'tumor': float(confidence_tumor)
            },
            'validation': 'Confirmed brain MRI',
            'validation_passed': True
        })
    except Exception as e:
        import traceback
        return JsonResponse({
            'error': str(e),
            'traceback': traceback.format_exc()
        }, status=500)
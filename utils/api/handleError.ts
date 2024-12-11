import axios from "axios";

export function handleError(error: any): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data.message || 
             error.response.data.error || 
             'An error occurred while processing your request';
    } else if (error.request) {
      return 'No response received from server';
    } else {
      return 'Error setting up the request';
    }
  }
  return 'An unexpected error occurred';
}
export interface ISuccessResponse {
  meta: {
    code: number;
    message: string;
    pagination: IPaginationResponse;
  };
  data: any;
}

export interface IError {
  meta: {
    code: number;
    message: string;
  };
}

export interface IPaginationResponse {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;

  totalAbstain?: number;
  totalAgainst?: number;
  totalFor?: number;
  totalVotes?: number;
}

export interface IPaginationRequest {
  page?: number;
  limit?: number;
}

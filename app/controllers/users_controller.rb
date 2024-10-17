class UsersController < ApplicationController

    def users
        per_page = 10                       #per page records
        page = params.fetch(:page, 1).to_i  #fetch method is used to retrieve record if params are given in page then the given page record displayed if not then default page is 1 whose index is 0 and i used to  convert to integer if it is string or any other datatype if already integer then remain same
        offset = (page - 1) * per_page      #it subtract page 1 because page start from 1 and per page is 10 so offset for first page is 0 and so on
        @users = User.where(role: 'user').offset(offset).limit(per_page)  # database query who check if role is user and offset and limit for per page
        total_records = User.where(role: 'user').count        # it count total records whose role is user and count is a method who count the records
        total_pages = (total_records.to_f / per_page).ceil    #it divide total record to per page whose value is 10 and .to_f means if float numbers come then by ceil method give them the new page and total pages are found
        if total_pages > 0 && page <= total_pages         # it check if pages exist
            render json: { users: @users, total_pages: total_pages, current_page: page }, status: 200    #then render the users total pages and the current page 
            else
            render json: { message: 'No records found', total_pages: 0, current_page: 0 }, status: :not_found #if not then error msg show
        end
    end

    def admins
        per_page = 10
        page = params.fetch(:page, 1).to_i
        offset = (page - 1) * per_page
        @admins = User.where(role: 'admin').offset(offset).limit(per_page)
        total_records = User.where(role: 'admin').count
        total_pages = (total_records.to_f / per_page).ceil
        if total_pages > 0 && page <= total_pages
            render json: { admins: @admins, total_pages: total_pages, current_page: page }, status: 200
            else
            render json: { message:'No records found', total_pages: 0, current_page: 0 }, status: :not_found
        end
    end
end



   
 
  

   
  
      

   
  
  
  







  
class ArticlesController < ApplicationController
  before_action :authenticate_user, only: [:create]    #it authenticate user when create article 

  def index
    @articles = Article.all                      #show all article 
    render json: @articles.to_json(
      include: {                               #store procedure using include we add user and comment in article
          user: {only: [:name, :email]},
          comments: {
              include: {
                user: {only: [:name]}
              }, 
          }  
      },
    )
    
  end

  def create
    @article = @current_user.articles.new(article_params)        #it create new article and pass the article params like title and body 
    @article.user = current_user                                 #and the comment is create by current user who is login
    if @article.save
      render json: @article, status: :created
      
    else
      render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
    end
 end


def blogs
  per_page = 10      #per page records
  page = params.fetch(:page, 1).to_i   #fetch method is used to retrieve record if params are given in page then the given page record displayed if not then default page is 1 whose index is 0 and i used to  convert to integer if it is string or any other datatype if already integer then remain same
  offset = (page - 1) * per_page   #it subtract page 1 because page start from 1 and per page is 10 so offset for first page is 0 and so on
  @articles = Article.offset(offset).limit(per_page) # article offset and limit for per page
  total_records = Article.count  # it count total records and count is a method who count the records
  total_pages = (total_records.to_f / per_page).ceil #it divide total record to per page whose value is 10 and .to_f means if float numbers come then by ceil method give them the new page and total pages are found

  if total_pages > 0 && page <= total_pages                          # it check if pages exist
    render json: { articles: @articles.as_json(                      #then render the article total pages and the current page 
        include: {
            user: {only: [:name]},      
        },
      ),
      total_pages: total_pages,
      current_page: page
    }, status: 200
  else
    render json: { message: 'No records found', total_pages: 0, current_page: 0 }, status: :not_found
  end

end

 private
 def article_params
   params.require(:article).permit(:title, :body)     #it permit the title and body which is to be send when create the article
 end

  def authenticate_user
    token = request.headers['Authorization']&.split(' ')&.last  # if header exist split the header and get the last part of header to assume it is token
    jwt_payload = JWT.decode(token, Rails.application.credentials.devise_jwt_secret_key) #decode the token using secret key
    unless jwt_payload        #if jwt token is not present it show an error
      render json: { error: 'Unauthorized (Invalid JWT)' }, status: :unauthorized
      return
    end
  
    user_id = jwt_payload.first['sub']   #subject which represent the user id
    @current_user = User.find_by(id: user_id)  #in database it find the current user by user id

    unless @current_user  #if user with given id not found  then error shows
      render json: { error: "Unauthorized (User not found for ID: #{user_id})" }, status: :unauthorized
    end
  rescue JWT::DecodeError => e  #error handling
    render json: { error: "Unauthorized (JWT Decode Error: #{e.message})" }, status: :unauthorized
  end
end 





 
 

  










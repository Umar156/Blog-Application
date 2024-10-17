class CommentsController < ApplicationController
  before_action :authenticate_user! , only: [:create, :update]      #it authenticate user when create comment and update the comment
  before_action :set_article, only:[:create]    
  
  def index
    @comments = @article.comments           #it shows all the comments on every article
    render json: @comments
  end

  def show
    @comment = @article.comments.find_by(params[:id])      # there is an association between article and comments and it find the comment id
    render json: @comment
  end

  def create
    @comment = @article.comments.new(comment_params)   #it create new comment and pass the comment params like body and article id
    @comment.user = current_user #and the comment is create by current user who is login
    
    if @comment.save
      render json: @comment, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end
 
  def edit
    @comment = Comment.find_by(params[:id])  #edit the comment by find the comment id
    render json: @comment
   end
  
   def update
    @comment = Comment.find_by(id: params[:id])       #find the comment by its id
    if @comment && @comment.update(comment_params)          #if comment is update 
      render json: @comment, status: :ok     #then status is ok 
    else
        render json: {errors: "Unable to update comment"}, status: :unprocessible_entity  #otherwise show error msg
    end
   end


  private

  def set_article
    @article = Article.find(comment_params[:article_id])        #its private method that find article id on which comment create and article id come from comment params
  end

  def comment_params
    params.require(:comment).permit(:body, :article_id)           #it permit the body and  article id which is to be send when create the comment
  end                                                           


end







 


 





 
  

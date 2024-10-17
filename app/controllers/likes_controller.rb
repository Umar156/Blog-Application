class LikesController < ApplicationController
  before_action :authenticate_user! , only: [:create]    #it authenticate user before create like
  before_action :set_article, only: [:create]       #it send article id before like 
  
  def index
  end

  def show
  end

  def create
    if current_user.likes.exists?(article_id: @article.id)    # if current user like already exist on same article 
      like = current_user.likes.find_by(article_id: @article.id)  #current user, like find by article id 
      like.destroy                                                   #then by again click on same user then the like will be delete 
      render json: { message: "Article unliked successfully" }, status: :ok  #and message shown unliked successfully
    else
      @like = @article.likes.new(user: current_user)         #if new user like the article
      if @like.save                                          #if save the like
        render json: { message: "Article liked successfully", like: @like }, status: :created   #message shown like create successfully
      else
        render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity      #if there is any error then message shown unproccessable entity
      end
    end
  end

  private

  def set_article
    @article = Article.find(like_params[:article_id])   #its private method that find article id on which like create and article id come from like params
  end

  def like_params
    params.require(:like).permit(:article_id)         #it permit the article id which is to be send when create the like
  end
 

end









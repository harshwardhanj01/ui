import mongoose, { Collection, Schema } from "mongoose";

const tradeSchema = new Schema({
    
     
      open_time: {
        type: String,
        required: true
      },
      open_price: {
        type: Number,
        required: true
      },
      close_time: {
        type: String,
        required: true
      },
      close_price: {
        type: Number,
        required: true
      },
      side: {
        type: String,
        required: true
      },
      symbol: {
        type: String,
        required: true
      },
      volume: {
        type: Number,
        required: true
      },
      stop_loss: {
        type: Number,
        required: true
      },
      take_profit: {
        type: Number,
        required: true
      },
  }, 
{timestamps: true }, {Collection: 'trade_history'});

const trade_history =
  mongoose.models.trade_history || mongoose.model("trade_history", tradeSchema);

export default trade_history;
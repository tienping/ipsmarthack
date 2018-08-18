//
//  ToastHandler.m
//  Hermo
//
//  Created by Enoch Lau on 15/09/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ToastHandler.h"
#import "RKDropdownAlert.h"

@implementation ToastHandler

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(alert:(NSString*)title message:(NSString *)message type:(NSString *)type)
{
  UIColor *color;
  
  if ([type isEqualToString:@"success"]) {
    color = [UIColor colorWithRed:0.28 green:0.78 blue:0.31 alpha:1];
  } else if ([type isEqualToString:@"error"]) {
    color = [UIColor colorWithRed:0.73 green:0.18 blue:0.17 alpha:1];
  } else if ([type isEqualToString:@"warning"]) {
    color = [UIColor colorWithRed:0.96 green:0.57 blue:0.03 alpha:1];
  } else if ([type isEqualToString:@"info"]) {
    color = [UIColor colorWithRed:0.61 green:0.76 blue:0.81 alpha:1];
  } else {
    color = [UIColor colorWithRed:0 green:0 blue:0 alpha:1];
  }
  
  [RKDropdownAlert title:title message:message backgroundColor:color textColor:[UIColor whiteColor]];

}

RCT_EXPORT_METHOD(copyToClipboard:(NSString *)title message:(NSString *)message)
{
  UIPasteboard *pb = [UIPasteboard generalPasteboard];
  [pb setString:message];
  UIColor  *color = [UIColor colorWithRed:0.28 green:0.78 blue:0.31 alpha:1];
NSString *coordinates = [NSString stringWithFormat:@"%@ %@.", message, title];
  [RKDropdownAlert title:[NSString stringWithFormat:@"%@ %@.", message, title] backgroundColor:color textColor:[UIColor whiteColor]];

}

@end

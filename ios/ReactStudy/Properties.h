//
//  Properties.h
//  ReactStudy
//
//  Created by Rongbin on 16/6/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//
#import <CommonCrypto/CommonCryptoError.h>
#import <CommonCrypto/CommonCrypto.h>
#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"

@interface Properties : NSObject<RCTBridgeModule>
-(NSDictionary *)encryptParameters:(NSDictionary *)parames;
-(NSString *) encryptUseDES:(NSString *)plainText key:(NSString *)key;
@end
